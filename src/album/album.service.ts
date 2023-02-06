import { Injectable } from '@nestjs/common';

import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './in-memory/album.repository';
import { BadRequestError, NotFoundError } from 'src/utils/errors';
import {
  ARTIST_ENTITY_NOT_FOUND_ERROR,
  ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorites.internal';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    @InjectInMemoryDBService('track')
    private readonly trackInMemoryDBService: InMemoryDBService<TrackEntity>,
    @InjectInMemoryDBService('artist')
    private readonly artirstInMemoryDBService: InMemoryDBService<ArtistEntity>,
    @InjectInMemoryDBService('favorite')
    private readonly favoriteInMemoryDBService: InMemoryDBService<Favorites>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (
      createAlbumDto.artistId !== null &&
      !this.artirstInMemoryDBService.get(createAlbumDto.artistId)
    ) {
      throw new BadRequestError(ARTIST_ENTITY_NOT_FOUND_ERROR);
    }
    return this.albumRepository.create(createAlbumDto);
  }

  findAll() {
    return this.albumRepository.getAll();
  }

  findMany(clause: { key: string; value: any }) {
    return this.albumRepository.query((u) => u[clause.key] === clause.value);
  }

  findOne(id: string) {
    const album = this.albumRepository.get(id);
    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumRepository.get(id);
    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (
      updateAlbumDto.artistId !== undefined &&
      updateAlbumDto.artistId !== null &&
      !this.artirstInMemoryDBService.get(updateAlbumDto.artistId)
    ) {
      throw new BadRequestError(ARTIST_ENTITY_NOT_FOUND_ERROR);
    }
    return this.albumRepository.update({ ...album, ...updateAlbumDto });
  }

  remove(id: string) {
    const album = this.albumRepository.get(id);
    if (!album) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    const tracks = this.trackInMemoryDBService.query(
      (t) => t.albumId === album.id,
    );
    tracks.map((track) => {
      this.trackInMemoryDBService.update({ ...track, albumId: null });
    });

    const favsRes = this.favoriteInMemoryDBService
      .query((entity) => {
        return entity.albums.includes(id);
      })
      .pop();

    if (favsRes !== undefined) {
      const favs = new Favorites(favsRes);
      favs.removeAlbum(id);
      this.favoriteInMemoryDBService.update(favs);
    }

    this.albumRepository.delete(id);
    return album;
  }
}
