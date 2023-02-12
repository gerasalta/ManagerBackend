import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../notes/entities/note.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>
  ) { }

  create(createOrderDto: CreateOrderDto) {
    return 'orders only can be created from/notes';
  }

  findAll() {
    return `use orders/id for get an orders list from specific note`;
  }

  async findOne(id: string) {
    const data = await this.noteModel.findById(id)
    if (!data) {
      throw new BadRequestException({ hasError: true, message: `order with id:'${id}' not found` })
    }
    return { hasError: false, message: "order has been found successfully", orders: data.orders };
  }

  update( ) {
    return `orders cant be updated`;
  }

  async remove(id: string) {
    const data = await this.noteModel.findOneAndUpdate(
      { 'orders._id': id },
      { $pull: { orders: { _id: id } } },
      { new: true }
    )

    if (!data) {
      throw new BadRequestException({ hasError: true, message: `order with id:'${id}' not found` })
    }

    return { hasError: false, message: "order has been deleted successfully", data: data.orders };
  }
}
