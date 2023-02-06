import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    if (partial.version === undefined) {
      this.version = 1;
    }
    if (partial.createdAt === undefined) {
      this.createdAt = Date.now();
    }
    if (partial.updatedAt === undefined) {
      this.updatedAt = Date.now();
    }
  }
}
