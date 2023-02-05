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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';
import { StatusCodes } from 'http-status-codes';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  getAll(): AlbumEntity[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  getById(@Param() params: UuidParameterDto): AlbumEntity {
    return this.albumService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParameterDto,
    @Body() updatePasswordDto: UpdateAlbumDto,
  ): AlbumEntity {
    return this.albumService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param() params: UuidParameterDto): AlbumEntity {
    return this.albumService.remove(params.id);
  }
}
