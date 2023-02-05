import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectInMemoryDBService('user')
    private readonly db: InMemoryDBService<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): UserEntity {
    return new UserEntity(this.db.create(new UserEntity(createUserDto)));
  }

  getAll(): UserEntity[] {
    return this.db.getAll().map((u) => new UserEntity(u));
  }

  get(id: string): UserEntity {
    const user = this.db.get(id);
    if (user === undefined) return user;
    return new UserEntity(user);
  }

  update(user: UserEntity): UserEntity {
    this.db.update({
      ...user,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    return new UserEntity(this.db.get(user.id));
  }

  delete(id: string): UserEntity {
    const user = this.db.get(id);
    this.db.delete(id);
    return new UserEntity(user);
  }
}
