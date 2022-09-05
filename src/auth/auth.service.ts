import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userData: LoginUserDto) {
    const user = await this.validateUser(userData);

    return this.generateToken(user);
  }

  async signup(userData: CreateUserDto) {
    const userExists = await this.userService.getUserByEmail(userData.email);
    if (userExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userData.password, 5);
    const user = await this.userService.createUser({
      ...userData,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, roles: user.roles, id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userData: LoginUserDto) {
    const userByEmail = await this.userService.getUserByEmail(userData.email);
    if (!userByEmail) {
      throw new HttpException(
        'User with this email does not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const user = userByEmail;
    const passwordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Wrong email, username or password');
    }

    return user;
  }
}
