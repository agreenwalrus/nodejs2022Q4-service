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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';
import { StatusCodes } from 'http-status-codes';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): ArtistEntity {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  getAll(): ArtistEntity[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  getById(@Param() params: UuidParameterDto): ArtistEntity {
    return this.artistService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParameterDto,
    @Body() updatePasswordDto: UpdateArtistDto,
  ): ArtistEntity {
    return this.artistService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param() params: UuidParameterDto): ArtistEntity {
    return this.artistService.remove(params.id);
  }
}
