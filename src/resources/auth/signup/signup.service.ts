import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Signup } from './entities/signup.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SignupService {

  constructor(
    @InjectModel(Signup.name)
    private readonly signupModel: Model<Signup>
  ){}

  async create(CreateSignupDto: CreateSignupDto) {

    const username = CreateSignupDto.username
    const password = bcrypt.hashSync(CreateSignupDto.password, 10)

    const userCheck = await this.signupModel.findOne({username: username})

    if(userCheck){
      throw new BadRequestException('username already exist')
    }

    const signup = await this.signupModel.create({username: username, password: password})

    if(!signup){
      throw new BadRequestException({ hasError: true, message: `signup error` })
    }

    return {hasError: false, message: 'signup success', data: signup}

  }

}
