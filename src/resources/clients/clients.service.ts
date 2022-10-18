import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {


  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>)
    {
  }

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create(createClientDto)
      return { hasError: false, message: "client has been created successfully", data: client }
    }
    catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException({ hasError: true, message: `the value already exists in the database: ${JSON.stringify(err.keyValue)}` })
      }
      throw new InternalServerErrorException({ hasError: true, message: `internal server error` })
    }
  }

  async findAll(queryParameters) {
    let filter = {}
    const keyword = queryParameters.keyword
    const options = 'i'
    const regex = `${keyword}.*`
    if (keyword) {
      filter = {
        $or: [
          { fullName: { $regex: regex, $options: options } },
          { fullNameInv: { $regex: regex, $options: options } },
          { company: { $regex: regex, $options: options } },
          { phone: { $regex: regex, $options: options } }
        ]
      }
    }
    const clients = await this.clientModel.aggregate([
      { $addFields: { "fullName": { $concat: ["$name", " ", "$lastName"] } } },
      { $addFields: { "fullNameInv": { $concat: ["$lastName", " ", "$name"] } } },
      { $match: { $and: [filter] }},
      { $unset: ['fullName', 'fullNameInv', '__v']}
    ])

    return clients
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findByIdAndUpdate(id, updateClientDto)
    return client;
  }

  async remove(id: string) {
    const client = await this.clientModel.findByIdAndDelete(id)
    return client;
  }

}
