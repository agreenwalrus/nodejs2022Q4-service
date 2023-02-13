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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { StatusCodes } from 'http-status-codes';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: StatusCodes.CREATED,
    description: 'The record is created',
    type: TrackEntity,
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: [TrackEntity],
  })
  async getAll(): Promise<TrackEntity[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'The found record',
    type: TrackEntity,
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<TrackEntity> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Updated',
    type: TrackEntity,
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: StatusCodes.BAD_REQUEST,
    description: 'Id is not valid UUIDv4',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiResponse({
    status: StatusCodes.NO_CONTENT,
    description: 'Deleted',
    type: TrackEntity,
  })
  @ApiResponse({
    status: StatusCodes.NOT_FOUND,
    description: 'Not found',
  })
  @ApiParam({ name: 'id', type: String, format: 'UUIDv4' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.trackService.remove(id);
  }
}
