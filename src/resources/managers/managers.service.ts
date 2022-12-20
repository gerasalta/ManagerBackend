import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../notes/entities/note.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {

  constructor(
    @InjectModel(Manager.name)
    private readonly managerModel: Model<Manager>,
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>
  ){}


  async create(createManagerDto: CreateManagerDto) {
    const data = await this.managerModel.create(createManagerDto)
    return data;
  }

  async findAll() {
    const data = await this.managerModel.find()
    return data;
  }

  async findOne(id: string) {
    const data = await this.managerModel.findById(id)
    return data;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const data = await this.managerModel.findByIdAndUpdate(id, updateManagerDto, {new: true})
    return data;
  }

  async remove(id: string) {
    const data = await this.noteModel.aggregate([
      { $match: { _id: { $eq: id} } }
    ])
    return data;
  }
}
