import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from '../signup/entities/signup.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    MongooseModule.forFeature([
      {name: Signup.name, schema: SignupSchema }
    ])
  ]
})
export class LoginModule {}
