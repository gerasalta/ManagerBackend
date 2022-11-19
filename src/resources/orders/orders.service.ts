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
    return 'orders only can be created from /notes';
  }

  findAll() {
    return `use notes/id for get the orders list`;
  }

  async findOne(id: string) {
    const orders = await this.noteModel.findById(id)
    if(!orders){
      throw new BadRequestException({ hasError: true, message: `order with id:'${id}' not found` })
    }
    return { hasError: false, message: "order has been deleted successfully", orders: orders.orders};
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `orders cant be updated`;
  }

  async remove(id: string) {
    const orderDeleted = await this.noteModel.updateMany(
      {},
      {
        $pull: {
          orders: {
            _id: id
          }
        }
      }
    )
    return { hasError: false, message: "order has been deleted successfully",  orderDeleted};
  }
}
