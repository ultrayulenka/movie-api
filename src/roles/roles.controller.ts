import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role-dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @Get('/:name')
  getAll(@Param('name') name: string) {
    return this.roleService.getRole(name);
  }
}
