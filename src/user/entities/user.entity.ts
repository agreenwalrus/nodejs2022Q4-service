import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity {
  @ApiProperty({ description: 'Id', format: 'UUIDv4' })
  id: string;

  @ApiProperty({ description: 'Login', example: 'Test User' })
  login: string;

  @ApiProperty({ description: 'Version of the user', example: 1 })
  version: number;

  @ApiProperty({ description: 'Created at', format: 'timestamp' })
  createdAt: number;

  @ApiProperty({ description: 'Last updated at', format: 'timestamp' })
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt.getTime(),
      updatedAt: partial.updatedAt.getTime(),
    });
  }
}
