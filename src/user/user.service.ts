import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from 'src/roles/dto/create-role-dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRole('USER');
    await user.$set('roles', role.id);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });

    return user;
  }

  async addRole(userId: number, roleData: CreateRoleDto) {
    const user = await this.getUserById(userId);
    const role = await this.rolesService.getRole(roleData.name);

    if (!user) {
      throw new HttpException(
        'User with this id does not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!role) {
      throw new HttpException(
        'Role with this name does not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    await user.$add('roles', role.id);

    return await this.getUserById(user.id);
  }
}
