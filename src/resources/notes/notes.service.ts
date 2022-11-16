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

    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: sort || '-updatedAt'
    }
    let notes = this.noteModel.aggregate([
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
      {
        $match: {
          $or: [
            filter
          ]
        }
      },
      {
        $unset: [
          'clientId',
          'clientIdConverted',
          'fullNameInv',
          'fullName',
          'phone',
          'company'
        ]
      }
    ])

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

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `notes cant not be updated`;
  }

  async remove(id: string) {
    const note = await this.noteModel.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequestException({ hasError: true, message: `note with id:'${id}' not found` })
    }
    return { hasError: false, message: "note has been deleted successfully" };
  }

}
