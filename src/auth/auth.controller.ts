import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }
}
