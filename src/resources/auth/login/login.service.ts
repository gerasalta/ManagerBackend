import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signup } from '../signup/entities/signup.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

  constructor(
    @InjectModel(Signup.name)
    private readonly loginModel: Model<Signup>
  ){}

  async login(LoginDto: CreateLoginDto) {

    const { username, password } = LoginDto

    const login = await this.loginModel.findOne({username: username})

    if(!login){
      throw new BadRequestException({hasError: true, message: 'user not found'})
    }

    const compare = bcrypt.compareSync(password, login.password)

    if(!compare){
      throw new BadRequestException({hasError: true, message: 'wrong password'})
    }

    return {hasError: false, message: 'login success'};
  }

}
