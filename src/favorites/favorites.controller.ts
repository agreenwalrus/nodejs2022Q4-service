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
import { FavoritesService } from './favorites.service';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';
import { StatusCodes } from 'http-status-codes';
import { FavoritesEntity } from './entities/favorites.entity';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesEntity {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.addArtist(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtist(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.removeArtist(params.id);
  }

  @Post('album/:id')
  addAlbum(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.addAlbum(params.id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbum(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.removeAlbum(params.id);
  }

  @Post('track/:id')
  addTrack(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.addTrack(params.id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrack(@Param() params: UuidParameterDto): FavoritesEntity {
    return this.favoritesService.removeTrack(params.id);
  }
}
