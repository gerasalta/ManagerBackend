import { Controller, Post, Body} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  login(@Body() LoginDto: CreateLoginDto) {
    return this.loginService.login(LoginDto);
  }

  @Post('/signup')
  signup(@Body() CreateSignupDto: CreateLoginDto) {
    return this.loginService.signup(CreateSignupDto);
  }



}
