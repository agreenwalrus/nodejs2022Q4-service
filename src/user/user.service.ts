import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { AccessDeniedError, NotFoundError } from 'src/utils/errors';
import {
  ENTITY_NOT_FOUND_ERROR,
  WRONG_CUR_PASSWORD_ERROR,
} from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.create({
        data: { ...createUserDto, version: 1 },
      }),
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.prisma.user.findMany()).map((e) => new UserEntity(e));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return new UserEntity(user);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (user.password === updatePasswordDto.oldPassword) {
      return new UserEntity(
        await this.prisma.user.update({
          where: { id },
          data: {
            version: user.version + 1,
            password: updatePasswordDto.newPassword,
          },
        }),
      );
    }
    throw new AccessDeniedError(WRONG_CUR_PASSWORD_ERROR);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    console.log('remove', id, user);
    if (!user) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
