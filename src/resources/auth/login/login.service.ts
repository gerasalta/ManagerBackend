import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {

  constructor(
    @InjectModel(Login.name)
    private readonly loginModel: Model<Login>,
    private readonly jwtService: JwtService
  ){}

  async login(LoginDto: CreateLoginDto) {

    const { username, password } = LoginDto

    const login = await this.loginModel.findOne({username})

    if(!login){
      throw new BadRequestException({hasError: true, message: 'user not found'})
    }

    const compare = bcrypt.compareSync(password, login.password)

    if(!compare){
      throw new BadRequestException({hasError: true, message: 'wrong password'})
    }

    return {hasError: false, message: 'login success', access_token: this.getJwt({username})};
  }

  async signup(CreateSignupDto: CreateLoginDto) {

    const username = CreateSignupDto.username
    const password = bcrypt.hashSync(CreateSignupDto.password, 10)

    const userCheck = await this.loginModel.findOne({username: username})

    if(userCheck){
      throw new BadRequestException('username already exist')
    }

    const signup = await this.loginModel.create({username: username, password: password})

    if(!signup){
      throw new BadRequestException({ hasError: true, message: `signup error` })
    }

    return {hasError: false, message: 'signup success'}

  }

  private getJwt(payload: any){
    return this.jwtService.sign(payload)
  }

}
