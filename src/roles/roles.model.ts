import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { UserRoles } from './user-roles.model';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

interface RoleCreationAttributes {
  name: string;
}

export type RoleName = 'ADMIN' | 'CONTRIBUTOR' | 'USER';

@Table({ tableName: 'roles' })
@ApiExtraModels(UserRoles)
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    enum: ['ADMIN', 'CONTRIBUTOR', 'USER'],
  })
  name: RoleName;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
