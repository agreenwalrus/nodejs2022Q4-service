import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectInMemoryDBService('album')
    private readonly db: InMemoryDBService<AlbumEntity>,
  ) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    return new AlbumEntity(this.db.create(new AlbumEntity(createAlbumDto)));
  }

  getAll(): AlbumEntity[] {
    return this.db.getAll().map((u) => new AlbumEntity(u));
  }

  get(id: string): AlbumEntity {
    const album = this.db.get(id);
    if (album === undefined) return album;
    return new AlbumEntity(album);
  }

  update(album: AlbumEntity): AlbumEntity {
    this.db.update(album);
    return new AlbumEntity(this.db.get(album.id));
  }

  delete(id: string): AlbumEntity {
    const album = this.db.get(id);
    this.db.delete(id);
    return new AlbumEntity(album);
  }

  query(predicate: (record: AlbumEntity) => boolean): AlbumEntity[] {
    return this.db.query(predicate).map((u) => new AlbumEntity(u));
  }
}
