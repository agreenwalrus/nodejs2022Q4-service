import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';

import { StatusCodes } from 'http-status-codes';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { FavoritesEntity } from './entities/favorites.entity';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Favorites',
    type: Promise<FavoritesEntity>,
  })
  async getAll(): Promise<FavoritesEntity> {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The artist is added',
    type: Promise<FavoritesEntity>,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    description: "The artist doesn't exists",
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async addArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoritesEntity> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
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
    description: 'The artist is not in favorites',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async removeArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoritesEntity> {
    return await this.favoritesService.removeArtist(id);
  }

  @Post('album/:id')
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The album is added',
    type: Promise<FavoritesEntity>,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    description: "The album doesn't exists",
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  addAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<FavoritesEntity> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
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
    description: 'The album is not in favorites',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async removeAlbum(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoritesEntity> {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('track/:id')
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The track is added',
    type: Promise<FavoritesEntity>,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiResponse({
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    description: "The track doesn't exists",
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async addTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoritesEntity> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
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
    description: 'The track is not in favorites',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async removeTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoritesEntity> {
    return this.favoritesService.removeTrack(id);
  }
}
