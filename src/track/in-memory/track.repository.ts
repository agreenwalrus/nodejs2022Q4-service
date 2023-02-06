import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';

@Injectable()
export class TrackRepository {
  constructor(
    @InjectInMemoryDBService('track')
    readonly db: InMemoryDBService<TrackEntity>,
  ) {}

  create(createTrackDto: CreateTrackDto): TrackEntity {
    return new TrackEntity(this.db.create(new TrackEntity(createTrackDto)));
  }

  getAll(): TrackEntity[] {
    return this.db.getAll().map((u) => new TrackEntity(u));
  }

  get(id: string): TrackEntity {
    const track = this.db.get(id);
    if (track === undefined) return track;
    return new TrackEntity(track);
  }

  update(track: TrackEntity): TrackEntity {
    this.db.update(track);
    return new TrackEntity(this.db.get(track.id));
  }

  delete(id: string): TrackEntity {
    const track = this.db.get(id);
    this.db.delete(id);
    return new TrackEntity(track);
  }

  query(predicate: (record: TrackEntity) => boolean): TrackEntity[] {
    return this.db.query(predicate).map((u) => new TrackEntity(u));
  }
}
