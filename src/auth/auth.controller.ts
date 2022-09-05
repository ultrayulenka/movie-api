import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }
}
