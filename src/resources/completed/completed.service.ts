import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../notes/entities/note.entity';
import { CreateCompletedDto } from './dto/create-completed.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';
import { Completed } from './entities/completed.entity';

@Injectable()

export class CompletedService {

  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
    @InjectModel(Completed.name)
    private readonly completedModel: Model<Completed>
  ) { }


  async create(id: string) {
    
      const note = await this.noteModel.aggregate([
        { $addFields: { idConverted: { $toString: '$_id' } } },
        { $match: { idConverted: id } },
        {
          $project: {
            debt: { $subtract: [{ $subtract: [{ $sum: '$orders.price' }, { $sum: '$advances.advance' }] }, '$discount'] },
            clientId: 1,
            discount: 1,
            orders: 1,
            advances: 1
          }
        },
        { $out: "completeds" }
      ])
   
      return { hasError: false, message: "note has been moved successfully" }

  }

  async findAll() {
    const data = await this.completedModel.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} completed`;
  }

  update(id: number, updateCompletedDto: UpdateCompletedDto) {
    return `This action updates a #${id} completed`;
  }

  remove(id: number) {
    return `This action removes a #${id} completed`;
  }
}
