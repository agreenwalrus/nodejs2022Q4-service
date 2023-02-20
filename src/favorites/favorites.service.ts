import { Injectable } from '@nestjs/common';
import { NotFoundError, UnprocessableEntityError } from 'src/utils/errors';
import {
  ALBUM_ENTITY_NOT_FAVORITE_ERROR,
  ALBUM_ENTITY_NOT_FOUND_ERROR,
  ARTIST_ENTITY_NOT_FAVORITE_ERROR,
  ARTIST_ENTITY_NOT_FOUND_ERROR,
  TRACK_ENTITY_NOT_FAVORITE_ERROR,
  TRACK_ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  private _favoriteId;

  constructor(private readonly prisma: PrismaService) {
    this._init();
  }

  private async _init() {
    const id = await this._getSingleId();
    if (!id) {
      await this.prisma.favorite.create({ data: {} });
    }
    this._favoriteId = await this._getSingleId();
  }

  private async _getSingleId(): Promise<string> {
    const favs = await this.prisma.favorite.findMany();
    if (favs.length !== 0) {
      return favs[0].id;
    } else {
      return undefined;
    }
  }

  private async _getSingle(): Promise<FavoritesEntity> {
    const favs = await this.prisma.favorite.findFirst({
      where: { id: this._favoriteId },
      select: {
        id: false,
        tracks: {
          select: {
            track: true,
          },
        },
        albums: {
          select: {
            album: true,
          },
        },
        artists: {
          select: {
            artist: true,
          },
        },
      },
    });

    return new FavoritesEntity(favs);
  }

  async findAll(): Promise<FavoritesEntity> {
    return await this._getSingle();
  }

  async addArtist(id: string): Promise<FavoritesEntity> {
    if (!(await this.prisma.artist.findFirst({ where: { id } }))) {
      throw new UnprocessableEntityError(ARTIST_ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.favoriteArtist.create({
      data: { favoriteId: this._favoriteId, artistId: id },
    });

    return this._getSingle();
  }

  async removeArtist(id: string): Promise<FavoritesEntity> {
    if (
      !(await this.prisma.favoriteArtist.findFirst({ where: { artistId: id } }))
    ) {
      throw new NotFoundError(ARTIST_ENTITY_NOT_FAVORITE_ERROR);
    }

    await this.prisma.favoriteArtist.delete({
      where: {
        favoriteId_artistId: { favoriteId: this._favoriteId, artistId: id },
      },
    });
    return this._getSingle();
  }

  async addAlbum(id: string): Promise<FavoritesEntity> {
    if (!(await this.prisma.album.findFirst({ where: { id } }))) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.favoriteAlbum.create({
      data: { favoriteId: this._favoriteId, albumId: id },
    });

    return this._getSingle();
  }

  async removeAlbum(id: string): Promise<FavoritesEntity> {
    if (
      !(await this.prisma.favoriteAlbum.findFirst({ where: { albumId: id } }))
    ) {
      throw new NotFoundError(ALBUM_ENTITY_NOT_FAVORITE_ERROR);
    }

    await this.prisma.favoriteAlbum.delete({
      where: {
        favoriteId_albumId: { favoriteId: this._favoriteId, albumId: id },
      },
    });
    return this._getSingle();
  }

  async addTrack(id: string): Promise<FavoritesEntity> {
    if (!(await this.prisma.track.findFirst({ where: { id } }))) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    await this.prisma.favoriteTrack.create({
      data: { favoriteId: this._favoriteId, trackId: id },
    });

    return this._getSingle();
  }

  async removeTrack(id: string): Promise<FavoritesEntity> {
    if (
      !(await this.prisma.favoriteTrack.findFirst({ where: { trackId: id } }))
    ) {
      throw new NotFoundError(TRACK_ENTITY_NOT_FAVORITE_ERROR);
    }

    await this.prisma.favoriteTrack.delete({
      where: {
        favoriteId_trackId: { favoriteId: this._favoriteId, trackId: id },
      },
    });
    return this._getSingle();
  }
}
