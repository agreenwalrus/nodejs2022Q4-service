import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './in-memory/artist.repository';
import { NotFoundError } from 'src/utils/errors';
import { ENTITY_NOT_FOUND_ERROR } from 'src/utils/constants';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { Favorites } from 'src/favorites/entities/favorites.internal';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    @InjectInMemoryDBService('track')
    private readonly trackInMemoryDBService: InMemoryDBService<TrackEntity>,
    @InjectInMemoryDBService('album')
    private readonly albumInMemoryDBService: InMemoryDBService<AlbumEntity>,
    @InjectInMemoryDBService('favorite')
    private readonly favoriteInMemoryDBService: InMemoryDBService<Favorites>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }

  findAll() {
    return this.artistRepository.getAll();
  }

  findMany(clause: { key: string; value: any }) {
    return this.artistRepository.query((u) => u[clause.key] === clause.value);
  }

  findOne(id: string) {
    const artist = this.artistRepository.get(id);
    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistRepository.get(id);
    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return this.artistRepository.update({ ...artist, ...updateArtistDto });
  }

  remove(id: string) {
    const artist = this.artistRepository.get(id);
    if (!artist) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    const albums = this.albumInMemoryDBService.query(
      (t) => t.artistId === artist.id,
    );
    albums.map((album) => {
      this.albumInMemoryDBService.update({ ...album, artistId: null });
    });

    const tracks = this.trackInMemoryDBService.query(
      (t) => t.artistId === artist.id,
    );
    tracks.map((track) => {
      this.trackInMemoryDBService.update({ ...track, artistId: null });
    });

    const favsRes = this.favoriteInMemoryDBService
      .query((entity) => {
        return entity.artists.includes(id);
      })
      .pop();

    if (favsRes !== undefined) {
      const favs = new Favorites(favsRes);
      favs.removeArtist(id);
      this.favoriteInMemoryDBService.update(favs);
    }

    this.artistRepository.delete(id);
    return artist;
  }
}
