import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Exclude } from 'class-transformer';

export class UserEntity implements InMemoryDBEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
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
