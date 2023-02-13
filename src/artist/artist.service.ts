import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundError } from 'src/utils/errors';
import { ENTITY_NOT_FOUND_ERROR } from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return this.prisma.artist.update({ data: updateArtistDto, where: { id } });
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.artist.delete({ where: { id } });
  }
}
