import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthGuard } from './auth.guard';
import { UserParam } from './user.decorator';
import { User } from 'src/user/user.model';
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

  @Get()
  @UseGuards(AuthGuard)
  tokenSignin(@UserParam() user: User) {
    return this.authService.tokenLogin(user);
  }
}
