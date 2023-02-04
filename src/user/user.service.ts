import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { AccessDeniedError, NotFoundError } from 'src/utils/errors';
import {
  ENTITY_NOT_FOUND_ERROR,
  WRONG_CUR_PASSWORD_ERROR,
} from 'src/utils/constants';
import { UserRepository } from './in-memory/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): UserEntity {
    return this.userRepository.create(createUserDto);
  }

  findAll(): UserEntity[] {
    return this.userRepository.getAll().map((u) => u);
  }

  findOne(id: string): UserEntity {
    const user = this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): UserEntity {
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

  remove(id: string): UserEntity {
    const user = this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    this.userRepository.delete(id);
    return user;
  }
}
