import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {


  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    @InjectModel(Client.name)
    private readonly paginateModel: AggregatePaginateModel<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create(createClientDto)
      return { hasError: false, message: "client has been created successfully", data: client }
    }
    catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException({ hasError: true, message: `the value already exists in the client collection: ${JSON.stringify(err.keyValue)}` })
      }
      throw new InternalServerErrorException({ hasError: true, message: `internal server error` })
    }
  }

  findAll(queryParameters) {
    let filter = {}
    const { keyword, limit, sort, page } = queryParameters
    const regex = `${keyword}.*`
    const regexOptions = 'i'
    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: sort || '-updatedAt'
    }
    if (keyword) {
      filter = {
        $or: [
          { fullName: { $regex: regex, $options: regexOptions } },
          { fullNameInv: { $regex: regex, $options: regexOptions } },
          { company: { $regex: regex, $options: regexOptions } },
          { phone: { $regex: regex, $options: regexOptions } }
        ]
      }
    }
    let clients = this.paginateModel.aggregate([
      { $addFields: { "fullName": { $concat: ["$name", " ", "$lastName"] } } },
      { $addFields: { "fullNameInv": { $concat: ["$lastName", " ", "$name"] } } },
      { $match: { $and: [filter] } },
      { $unset: ['fullName', 'fullNameInv'] }
    ])

    let paginatedClients = this.paginateModel.aggregatePaginate(clients, paginateOptions)
    return paginatedClients
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    if (!client) {
      throw new BadRequestException({ hasError: true, message: `client with id:'${id}' not found` })
    }
    return { hasError: false, message: "client has been found successfully", data: client };
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try{
      const client = await this.clientModel.findByIdAndUpdate(id, updateClientDto, {new: true})
      if(!client){
        throw new BadRequestException({hasError: true, message: `id:'${id}' not found`})
      }
      return {hasError: false, message: "client has been updated successfully", data: client}
    }
    catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException({ hasError: true, message: `the value already exists in the database: ${JSON.stringify(err.keyValue)}` })
      }
      throw new InternalServerErrorException({ hasError: true, message: `internal server error` })
    }
  }

  async remove(id: string) {
    const client = await this.clientModel.findByIdAndDelete(id)
    if(!client){
      throw new BadRequestException({hasError: true, message: `id:'${id}' not found`})
    }
    return {hasError: false, message: "client has been removed successfully"}
  }

}
