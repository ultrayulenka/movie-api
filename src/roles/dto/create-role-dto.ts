import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleName } from '../roles.model';

const RoleNames: Array<RoleName> = ['USER', 'CONTRIBUTOR', 'ADMIN'];

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoleNames)
  readonly name: string;
}
