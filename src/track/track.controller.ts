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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidParameterDto } from 'src/utils/dto/uuid.dto';
import { StatusCodes } from 'http-status-codes';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  getAll(): TrackEntity[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  getById(@Param() params: UuidParameterDto): TrackEntity {
    return this.trackService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParameterDto,
    @Body() updatePasswordDto: UpdateTrackDto,
  ): TrackEntity {
    return this.trackService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param() params: UuidParameterDto): TrackEntity {
    return this.trackService.remove(params.id);
  }
}
