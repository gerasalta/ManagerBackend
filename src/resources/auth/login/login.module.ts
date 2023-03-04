import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './entities/login.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    MongooseModule.forFeature([
      {name: Login.name, schema: LoginSchema }
    ]),
    JwtModule.registerAsync({
      imports: [ ConfigModule],
      inject: [ ConfigService ],
      useFactory: ( ConfigService: ConfigService ) => {
        return {secret: ConfigService.get('JWT_SECRET'), signOptions: {expiresIn: '3h'}}
      }
    })
  ]
})
export class LoginModule {}
