import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAll(): UserEntity[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param() params: UuidParameterDto): UserEntity {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParameterDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    return this.userService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param() params: UuidParameterDto): UserEntity {
    return this.userService.remove(params.id);
  }
}
