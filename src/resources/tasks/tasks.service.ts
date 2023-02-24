import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    @InjectModel(Task.name)
    private readonly paginationModel: AggregatePaginateModel<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create(createTaskDto)
      return { hasError: false, message: "task has been created successfully", data: task }
    }
    catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException({ hasError: true, message: `the value already exists in the client collection: ${JSON.stringify(err.keyValue)}` })
      }
      throw new InternalServerErrorException({ hasError: true, message: `internal server error` })
    }
  }

  async findAll(queryParameters) {

    let filter = {}
    let { limit, pageIndex, sort, keyword } = queryParameters;
    const regex = `${keyword}.*`
    const regexOptions = 'i'

    if (keyword) {
      filter = {
        $or: [
          { manager: { $regex: regex, $options: regexOptions } }
        ]
      }
    }

    const paginateOptions = {
      page: pageIndex || 1,
      limit: limit || 10,
      sort: sort || '-updatedAt'
    }

    let tasks = this.paginationModel.aggregate([
      { $match: { $and: [filter] } },
      { $addFields: { managerIdConverted: { $toObjectId: '$managerId' } } },
      {
        $lookup: {
          from: "managers",
          localField: "managerIdConverted",
          foreignField: "_id",
          as: "name"
        }
      },
      {$addFields: {manager: '$name.manager'}},
      {$unwind: '$manager'},
      {
        $project: {
          managerIdConverted: 0,
          name: 0
        }
      }
    ])

    let paginatedTasks = this.paginationModel.aggregatePaginate(tasks, paginateOptions)
    return paginatedTasks

  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id)
    if (!task) {
      throw new BadRequestException({ hasError: true, message: `task with id:'${id}' not found` })
    }
    return { hasError: false, message: "task has been found successfully", data: task };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true })
    return { hasError: false, message: "task has been updated successfully", data: task };
  }

  async remove(id: string) {
    const client = await this.taskModel.findByIdAndDelete(id)
    if (!client) {
      throw new BadRequestException({ hasError: true, message: `task with id:'${id}' not found` })
    }
    return { hasError: false, message: "task has been removed successfully" }
  }
}
