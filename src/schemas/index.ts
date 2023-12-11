import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.some-token',
  })
  token: string;
}

export type AvailablePermissions =
  | 'view movies'
  | 'create movies'
  | 'edit movies'
  | 'delete movies'
  | 'view user'
  | 'edit user';

const AvailablePermissionsArr = [
  'view movies',
  'create movies',
  'edit movies',
  'delete movies',
  'view user',
  'edit user',
];

export class UserData {
  @ApiProperty({
    example: '1',
  })
  id: number;

  @ApiPropertyOptional({
    example: 'my_name',
  })
  username?: string;

  @ApiProperty({
    example: 'user@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'password',
  })
  password: string;

  @ApiProperty({
    type: [String],
    example: [AvailablePermissionsArr[0], AvailablePermissionsArr[1]],
    enum: AvailablePermissionsArr,
  })
  permissions: Array<AvailablePermissions>;
}
