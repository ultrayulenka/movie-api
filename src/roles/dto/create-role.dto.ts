import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleName } from '../roles.model';
import { ApiProperty } from '@nestjs/swagger';

const RoleNames: Array<RoleName> = ['USER', 'CONTRIBUTOR', 'ADMIN'];

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoleNames)
  @ApiProperty({ enum: RoleNames, type: String })
  readonly name: string;
}
