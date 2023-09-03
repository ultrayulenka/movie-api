import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from 'src/roles/dto/create-role-dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';
import Exception from 'src/exceptions/exceptions';
import { RoleName } from 'src/roles/roles.model';

type AvailablePermissions =
  | 'view movies'
  | 'create movies'
  | 'edit movies'
  | 'delete movies'
  | 'view user'
  | 'edit user';
type UserData = Partial<User> & { permissions: Array<AvailablePermissions> };

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  permissions: Record<RoleName, Array<AvailablePermissions>> = {
    USER: ['view movies'],
    CONTRIBUTOR: ['create movies', 'edit movies', 'delete movies'],
    ADMIN: ['view user', 'edit user'],
  };

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRole('USER');
    await user.$set('roles', role.id);
    user.roles = [role];

    return user;
  }

  async getAllUsers(): Promise<UserData[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users.map(this.transfromUserData);
  }

  async getUserById(id: number): Promise<UserData> {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });

    return this.transfromUserData(user);
  }

  async getUserByEmail(email: string): Promise<UserData> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return this.transfromUserData(user);
  }

  async getUserByUsername(username: string): Promise<UserData> {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });

    return this.transfromUserData(user);
  }

  async addRole(userId: number, roleData: CreateRoleDto) {
    const user = await this.getUserById(userId);
    const role = await this.rolesService.getRole(roleData.name);

    if (!user) {
      throw new Exception.NotFoundException('User');
    }
    if (!role) {
      throw new Exception.NotFoundException('Role');
    }

    await user.$add('roles', role.id);

    return await this.getUserById(user.id);
  }

  transfromUserData(user: User): UserData {
    return {
      ...user,
      permissions: [
        ...user.roles.flatMap((role) => this.permissions[role.name]),
      ],
      roles: undefined,
    };
  }
}
