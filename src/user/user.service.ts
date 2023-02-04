import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db/src/services';
import { User } from './entities/user.entity';
import { AccessDeniedError, NotFoundError } from 'src/utils/errors';
import {
  ENTITY_NOT_FOUND_ERROR,
  WRONG_CUR_PASSWORD_ERROR,
} from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(private userRepository: InMemoryDBService<User>) {}

  create(createUserDto: CreateUserDto): User {
    return this.userRepository.create(createUserDto);
  }

  findAll(): User[] {
    return this.userRepository.getAll();
  }

  findOne(id: string): User {
    const user = this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (user.password === updatePasswordDto.oldPassword) {
      this.userRepository.update({
        ...user,
        password: updatePasswordDto.newPassword,
      });
      return this.userRepository.get(id);
    }
    throw new AccessDeniedError(WRONG_CUR_PASSWORD_ERROR);
  }

  remove(id: string): User {
    const user = this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    this.userRepository.delete(id);
    return user;
  }
}
