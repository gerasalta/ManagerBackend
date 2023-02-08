import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../notes/entities/note.entity';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';

@Injectable()
export class AdvancesService {

  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>
  ) { }

  create(createAdvanceDto: CreateAdvanceDto) {
    return 'This action adds a new advance';
  }

  findAll() {
    return `use advances/id for get an advances list from specific note`;
  }

  async findOne(id: string) {

    const data = await this.noteModel.aggregate([
      { $addFields: { advanceIdConverted: { $toString: '$_id' } } },
      { $match: { advanceIdConverted: id } },
      { $addFields: { subtotal: { $sum: '$orders.price' } } },
      { $addFields: { total: { $subtract: ['$subtotal', '$discount'] } } },
      { $addFields: { totalAdvances: { $sum: '$advances.advance' } } },
      { $addFields: { balance: { $subtract: ['$total', '$totalAdvances'] } } },
      {
        $project: {
          _id: 0,
          clientId: 0,
          manager: 0,
          term: 0,
          orders: 0,
          advanceIdConverted: 0,
          createdAt: 0,
          updatedAt: 0,
        }
      }
    ])

    if (!data.length) {
      throw new BadRequestException({ hasError: true, message: `advance with id:'${id}' not found` })
    }

    return { hasError: false, message: "advances has been found successfully", data: data[0] };

  }

  async update(id: string, updateAdvanceDto: UpdateAdvanceDto) {

    const balance = await this.noteModel.aggregate([
      { $addFields: { convertedId: { $toString: '$_id' } } },
      { $match: { convertedId: id } },
      { $addFields: { "debt": { $subtract: [{ $subtract: [{ $sum: '$orders.price' }, { $sum: "$advances.advance" }] }, "$discount"] } } }
    ])



    if (balance.length < 1) {

      throw new BadRequestException({ hasError: true, message: `note with id:'${id}' not found` })

    }

    else {

      if (updateAdvanceDto.advance <= balance[0].debt) {

        const data = await this.noteModel.findOneAndUpdate(
          { _id: id },
          { $push: { advances: updateAdvanceDto } },
          { new: true }
        )

        return { hasError: false, message: "advance has been updated successfully", data: data }
      }

      else {

        throw new BadRequestException({ hasError: true, message: `advance must be smaller than balance` })

      }

    }

  }

  async remove(id: string) {

    const data = await this.noteModel.findOneAndUpdate(
      { 'advances._id': id },
      { $pull: { advances: { _id: id } } },
      { new: true }
    )

    if (!data) {
      throw new BadRequestException({ hasError: true, message: `advances with id:'${id}' not found` })
    }

    return { hasError: false, message: "advance has been deleted successfully", data: data.advances };
  }
}
