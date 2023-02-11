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
import { ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { StatusCodes } from 'http-status-codes';
import { UserEntity } from './entities/user.entity';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The record is created',
    type: UserEntity,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'The artist is not found',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: [UserEntity],
  })
  async getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: UserEntity,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Updated',
    type: UserEntity,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiResponse({
    status: StatusCodes.NO_CONTENT,
    description: 'Deleted',
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
