import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, AggregatePaginateModel } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {

  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
    @InjectModel(Note.name)
    private readonly paginateModel: AggregatePaginateModel<Note>,
  ) { }

  async create(createNoteDto: CreateNoteDto) {
    try {
      const order = await this.noteModel.create(createNoteDto)
      return { hasError: false, message: "note has been created successfully", data: order }
    }
    catch (err) {
      return { hasError: true, message: "oops! can not create the note's note", err }
    }
  }

  async findAll(queryParameters) {
    let filter = {}
    const { keyword, limit, sort, page } = queryParameters
    const complete = queryParameters.complete || false
    const regex = `${keyword}.*`
    const regexOptions = 'i'
    if (keyword) {
      filter = {
        $or: [
          { fullName: { $regex: regex, $options: regexOptions } },
          { fullNameInv: { $regex: regex, $options: regexOptions } },
          { phone: { $regex: regex, $options: regexOptions } },
          { name: { $regex: regex, $options: regexOptions } }
        ]
      }
    }

    let aggregation = [
      { $addFields: { clientIdConverted: { $toObjectId: '$clientId' } } },
      {
        $lookup: {
          from: "clients",
          localField: "clientIdConverted",
          foreignField: "_id",
          as: "client"
        }
      },
      {
        $unwind: "$client"
      },
      { $addFields: { "fullName": { $concat: ["$client.name", " ", "client.$lastName"] } } },
      { $addFields: { "fullNameInv": { $concat: ["$client.lastName", " ", "$client.name"] } } },
      { $addFields: { "phone": '$client.phone' } },
      { $addFields: { "company": '$client.company' } },
      { $addFields: { "debt": {$subtract: [{$subtract: [{ $sum: '$orders.price' }, {$sum: "$advances.advance"}]}, "$discount"]} } },
      {
        $match: {
          $and: [
            filter,
            { complete: complete }
          ]
        }
      },
      {
        $project: {
          clientId: 0,
          clientIdConverted: 0,
          fullNameInv: 0,
          fullName: 0,
          phone: 0,
          company: 0
        }

      }
    ]

    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: sort || '-updatedAt'
    }

    let notes = this.noteModel.aggregate(aggregation)

    let paginatedNotes = this.paginateModel.aggregatePaginate(notes, paginateOptions)

    return paginatedNotes;
  }

  async findOne(id: string) {
    const order = await this.noteModel.findById(id)
    if (!order) {
      throw new BadRequestException({ hasError: true, message: `note with id:'${id}' not found` })
    }
    return { hasError: false, message: "note has been found successfully", data: order };
  }

  async complete(id: string) {
    const complete = await this.noteModel.findByIdAndUpdate(id, [{ $set: { complete: true } }], { new: true })

    if (!complete) {
      throw new BadRequestException({ hasError: true, message: `note with id:'${id}' not found` })
    }

    return { hasError: false, message: "note has been completed successfully", data: complete };
  }

  async update(id: string) {
    return { hasError: true, message: "cant update notes" };
  }

  async remove(id: string) {
    const note = await this.noteModel.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequestException({ hasError: true, message: `note with id:'${id}' not found` })
    }
    return { hasError: false, message: "note has been deleted successfully" };
  }

}
