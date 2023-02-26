import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from './entities/signup.entity';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  imports: [
    MongooseModule.forFeature([
      {name: Signup.name, schema: SignupSchema }
    ])
  ]
})
export class SignupModule {}
