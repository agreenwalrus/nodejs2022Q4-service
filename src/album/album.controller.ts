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
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { StatusCodes } from 'http-status-codes';
import { AlbumEntity } from './entities/album.entity';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The record is created',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'The artist is not found',
  })
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: [AlbumEntity],
  })
  getAll(): AlbumEntity[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: AlbumEntity,
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
  getById(@Param('id', ParseUUIDPipe) id: string): AlbumEntity {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Updated',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'The artist is not found',
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdateAlbumDto,
  ): AlbumEntity {
    return this.albumService.update(id, updatePasswordDto);
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
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.albumService.remove(id);
  }
}
