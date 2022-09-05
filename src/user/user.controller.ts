import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from 'src/roles/dto/create-role-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Put('/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  addRole(@Param('id') id: number, @Body() role: CreateRoleDto) {
    return this.userService.addRole(id, role);
  }
}
