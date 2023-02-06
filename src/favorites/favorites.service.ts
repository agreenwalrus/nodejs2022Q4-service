import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoriteRepository } from './in-memory/favorites.repository';
import { Favorites } from './entities/favorites.internal';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { NotFoundError, UnprocessableEntityError } from 'src/utils/errors';
import {
  ALBUM_ENTITY_NOT_FAVORITE_ERROR,
  ALBUM_ENTITY_NOT_FOUND_ERROR,
  ARTIST_ENTITY_NOT_FAVORITE_ERROR,
  TRACK_ENTITY_NOT_FAVORITE_ERROR,
  TRACK_ENTITY_NOT_FOUND_ERROR,
} from 'src/utils/constants';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favotitesRepository: FavoriteRepository,
    @InjectInMemoryDBService('track')
    private readonly trackInMemoryDBService: InMemoryDBService<TrackEntity>,
    @InjectInMemoryDBService('album')
    private readonly albumInMemoryDBService: InMemoryDBService<AlbumEntity>,
    @InjectInMemoryDBService('artist')
    private readonly artirstInMemoryDBService: InMemoryDBService<ArtistEntity>,
  ) {}

  private _prepareFavoritesEntity(favs: Favorites) {
    const artists = favs.artists
      .map((artistId) => this.artirstInMemoryDBService.get(artistId))
      .map((i) => new ArtistEntity(i));
    const albums = favs.albums
      .map((albumId) => this.albumInMemoryDBService.get(albumId))
      .map((i) => new AlbumEntity(i));
    const tracks = favs.tracks
      .map((trackId) => this.trackInMemoryDBService.get(trackId))
      .map((i) => new TrackEntity(i));
    return new FavoritesEntity({ artists, albums, tracks });
  }

  findAll(): FavoritesEntity {
    const favs = this.favotitesRepository.get();
    return this._prepareFavoritesEntity(favs);
  }

  addArtist(id: string): FavoritesEntity {
    if (!this.artirstInMemoryDBService.get(id)) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    const favs = this.favotitesRepository.get();
    favs.addArtist(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  removeArtist(id: string): FavoritesEntity {
    const favs = this.favotitesRepository.get();
    if (!this.isArtistInFavs(id)) {
      throw new NotFoundError(ARTIST_ENTITY_NOT_FAVORITE_ERROR);
    }
    favs.removeArtist(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  addAlbum(id: string): FavoritesEntity {
    if (!this.albumInMemoryDBService.get(id)) {
      throw new UnprocessableEntityError(ALBUM_ENTITY_NOT_FOUND_ERROR);
    }

    const favs = this.favotitesRepository.get();
    favs.addAlbum(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  removeAlbum(id: string): FavoritesEntity {
    const favs = this.favotitesRepository.get();
    if (!this.isAlbumInFavs(id)) {
      throw new NotFoundError(ALBUM_ENTITY_NOT_FAVORITE_ERROR);
    }
    favs.removeAlbum(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  addTrack(id: string): FavoritesEntity {
    if (!this.trackInMemoryDBService.get(id)) {
      throw new UnprocessableEntityError(TRACK_ENTITY_NOT_FOUND_ERROR);
    }

    const favs = this.favotitesRepository.get();
    favs.addTrack(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  removeTrack(id: string): FavoritesEntity {
    const favs = this.favotitesRepository.get();
    if (!this.isTrackInFavs(id)) {
      throw new NotFoundError(TRACK_ENTITY_NOT_FAVORITE_ERROR);
    }
    favs.removeTrack(id);
    this.favotitesRepository.update(favs);
    return this._prepareFavoritesEntity(favs);
  }

  isTrackInFavs(id: string): boolean {
    const favs = this.favotitesRepository.get();
    return favs.tracks.includes(id);
  }

  isAlbumInFavs(id: string): boolean {
    const favs = this.favotitesRepository.get();
    return favs.albums.includes(id);
  }

  isArtistInFavs(id: string): boolean {
    const favs = this.favotitesRepository.get();
    return favs.artists.includes(id);
  }
}
