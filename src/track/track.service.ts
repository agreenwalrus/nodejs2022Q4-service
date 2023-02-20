import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { NotFoundError, UnprocessableEntityError } from 'src/utils/errors';
import {
  ALBUM_ENTITY_NOT_FOUND_ERROR,
  ENTITY_NOT_FOUND_ERROR,
  TRACK_ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    if (
      createTrackDto.artistId !== null &&
      !(await this.prisma.artist.findFirst({
        where: { id: createTrackDto.artistId },
      }))
    ) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    if (
      createTrackDto.albumId !== null &&
      !(await this.prisma.album.findFirst({
        where: { id: createTrackDto.albumId },
      }))
    ) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }

    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (
      updateTrackDto.artistId !== null &&
      !(await this.prisma.artist.findFirst({
        where: { id: updateTrackDto.artistId },
      }))
    ) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    if (
      updateTrackDto.albumId !== null &&
      !(await this.prisma.album.findFirst({
        where: { id: updateTrackDto.albumId },
      }))
    ) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }

    return this.prisma.track.update({ data: updateTrackDto, where: { id } });
  }

  async remove(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.track.delete({ where: { id } });
  }
}
