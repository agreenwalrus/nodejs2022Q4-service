import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { BadRequestError, NotFoundError } from 'src/utils/errors';
import {
  ARTIST_ENTITY_NOT_FOUND_ERROR,
  ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    if (
      createAlbumDto.artistId !== null &&
      !(await this.prisma.artist.findFirst({
        where: { id: createAlbumDto.artistId },
      }))
    ) {
      throw new BadRequestError(ARTIST_ENTITY_NOT_FOUND_ERROR);
    }
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.prisma.album.findMany();
  }

  async findMany(clause: any): Promise<AlbumEntity[]> {
    return this.prisma.album.findMany({ where: clause });
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (
      updateAlbumDto.artistId !== undefined &&
      updateAlbumDto.artistId !== null &&
      !(await this.prisma.artist.findFirst({
        where: { id: updateAlbumDto.artistId },
      }))
    ) {
      throw new BadRequestError(ARTIST_ENTITY_NOT_FOUND_ERROR);
    }
    return this.prisma.album.update({ data: updateAlbumDto, where: { id } });
  }

  async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.album.delete({ where: { id } });

    // const tracks = await this.prisma.track.findMany({
    //   where: { albumId: album.id },
    // });

    // await Promise.all(
    //   tracks.map((track) => {
    //     this.prisma.track.update({
    //       data: { albumId: null },
    //       where: { id: track.id },
    //     });
    //   }),
    // );

    // await this.prisma.favoriteAlbum
    //   .delete({ where: { albumId: album.id } });
  }
}
