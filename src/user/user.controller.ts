import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UserData } from 'src/schemas';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer-token authorization header',
  })
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non admin users',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer-token authorization header',
  })
  @ApiResponse({
    status: 200,
    description: 'All users are returned',
    type: [UserData],
  })
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non admin users',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<Array<UserData>> {
    return this.userService.getAllUsers();
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer-token authorization header',
  })
  @ApiResponse({
    status: 200,
    description: 'User is updated',
    type: UserData,
  })
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non admin users',
  })
  @ApiResponse({
    status: 404,
    description: 'User or role with this details was not found',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/:id')
  addRole(@Param('id') id: number, @Body() role: CreateRoleDto) {
    return this.userService.addRole(id, role);
  }
}
