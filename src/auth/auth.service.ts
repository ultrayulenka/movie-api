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

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  test() {
    return {
      hello: 'hello',
    };
  }

  async login(userData: CreateUserDto) {
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

  private async validateUser(userData: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userData.email);
    if (!user) {
      throw new HttpException(
        'User with this email does not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const passwordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return user;
  }
}
