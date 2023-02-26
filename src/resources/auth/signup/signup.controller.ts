import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';

@Controller('auth/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signup(@Body() CreateSignupDto: CreateSignupDto) {
    return this.signupService.create(CreateSignupDto);
  }

}
