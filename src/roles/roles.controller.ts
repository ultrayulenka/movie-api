import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

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
  create(@Body() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer-token authorization header',
  })
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non admin users',
  })
  @ApiResponse({
    status: 404,
    description: 'Role with this name was not found',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.roleService.getRole(name);
  }
}
