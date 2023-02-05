import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './in-memory/track.repository';
import { NotFoundError, UnprocessableEntityError } from 'src/utils/errors';
import {
  ALBUM_ENTITY_NOT_FOUND_ERROR,
  ENTITY_NOT_FOUND_ERROR,
  TRACK_ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';
import { Favorites } from 'src/favorites/entities/favorites.internal';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    @InjectInMemoryDBService('favorite')
    private readonly favoriteInMemoryDBService: InMemoryDBService<Favorites>,
    @InjectInMemoryDBService('album')
    private readonly albumInMemoryDBService: InMemoryDBService<AlbumEntity>,
    @InjectInMemoryDBService('artist')
    private readonly artirstInMemoryDBService: InMemoryDBService<ArtistEntity>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    if (
      createTrackDto.artistId !== null &&
      !this.artirstInMemoryDBService.get(createTrackDto.artistId)
    ) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    if (
      createTrackDto.albumId !== null &&
      !this.albumInMemoryDBService.get(createTrackDto.albumId)
    ) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }

    return this.trackRepository.create(createTrackDto);
  }

  findAll() {
    return this.trackRepository.getAll();
  }

  findMany(clause: { key: string; value: any }) {
    return this.trackRepository.query((u) => u[clause.key] === clause.value);
  }

  findOne(id: string) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    if (
      updateTrackDto.artistId !== undefined &&
      updateTrackDto.artistId !== null &&
      !this.artirstInMemoryDBService.get(updateTrackDto.artistId)
    ) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }
    if (
      updateTrackDto.albumId !== undefined &&
      updateTrackDto.albumId !== null &&
      !this.albumInMemoryDBService.get(updateTrackDto.albumId)
    ) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }
    return this.trackRepository.update({ ...track, ...updateTrackDto });
  }

  remove(id: string) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }

    const favsRes = this.favoriteInMemoryDBService
      .query((entity) => {
        return entity.tracks.includes(id);
      })
      .pop();

    if (favsRes !== undefined) {
      const favs = new Favorites(favsRes);
      favs.removeTrack(id);
      this.favoriteInMemoryDBService.update(favs);
    }

    this.trackRepository.delete(id);
    return track;
  }
}
