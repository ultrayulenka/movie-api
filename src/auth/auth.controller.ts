import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { UserParam } from './user.decorator';
import { User } from 'src/user/user.model';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthResponse, UserData } from 'src/schemas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiResponse({
    status: 201,
    description: 'Successful sign-in, token is generated.',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong email, username or password',
  })
  @ApiResponse({
    status: 404,
    description: 'User with this details was not found',
  })
  signin(@Body() user: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(user);
  }

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'Successful sign-up, token is generated.',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'User with provided data already exists',
  })
  signup(@Body() user: CreateUserDto): Promise<AuthResponse> {
    return this.authService.signup(user);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Token is valid, user data is returned',
    type: UserData,
  })
  @ApiResponse({
    status: 401,
    description: 'User is unauthorized',
  })
  @UseGuards(AuthGuard)
  tokenSignin(@UserParam() user: User): UserData {
    return this.authService.tokenLogin(user);
  }
}
