import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectInMemoryDBService('artist')
    private readonly db: InMemoryDBService<ArtistEntity>,
  ) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    return new ArtistEntity(this.db.create(new ArtistEntity(createArtistDto)));
  }

  getAll(): ArtistEntity[] {
    return this.db.getAll().map((u) => new ArtistEntity(u));
  }

  get(id: string): ArtistEntity {
    const artist = this.db.get(id);
    if (artist === undefined) return artist;
    return new ArtistEntity(artist);
  }

  update(artist: ArtistEntity): ArtistEntity {
    this.db.update(artist);
    return new ArtistEntity(this.db.get(artist.id));
  }

  delete(id: string): ArtistEntity {
    const artist = this.db.get(id);
    this.db.delete(id);
    return new ArtistEntity(artist);
  }

  query(predicate: (record: ArtistEntity) => boolean): ArtistEntity[] {
    return this.db.query(predicate).map((u) => new ArtistEntity(u));
  }
}
