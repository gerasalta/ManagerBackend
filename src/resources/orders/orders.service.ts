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
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {

    const order = await this.noteModel.updateMany(
      {},
      {$pull: {
        orders: {
          _id: id
        }
      }},
      {
        multi: true
      }
    )

    if(!order){
      throw new BadRequestException({ hasError: true, message: `order with id:'${id}' not found` })
    }

    return order
  }
}
