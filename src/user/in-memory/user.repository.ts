import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Injectable()
export class UserRepository extends InMemoryDBService<UserEntity> {
  create(createUserDto: CreateUserDto): UserEntity {
    return new UserEntity(super.create(new UserEntity(createUserDto)));
  }

  getAll(): UserEntity[] {
    return super.getAll().map((u) => new UserEntity(u));
  }

  get(id: string): UserEntity {
    const user = super.get(id);
    if (user === undefined) return user;
    return new UserEntity(user);
  }

  update(user: UserEntity): UserEntity {
    super.update({ ...user, version: user.version + 1, updatedAt: Date.now() });
    return new UserEntity(super.get(user.id));
  }

  delete(id: string): UserEntity {
    const user = super.get(id);
    super.delete(id);
    return new UserEntity(user);
  }
}
