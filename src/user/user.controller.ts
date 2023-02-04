import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidParameterDto) {
    return this.userService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: UuidParameterDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param() params: UuidParameterDto) {
    return this.userService.remove(params.id);
  }
}
