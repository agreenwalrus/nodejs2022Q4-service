import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';

@Injectable()
export class TrackRepository extends InMemoryDBService<TrackEntity> {
  create(createTrackDto: CreateTrackDto): TrackEntity {
    return new TrackEntity(super.create(new TrackEntity(createTrackDto)));
  }

  getAll(): TrackEntity[] {
    return super.getAll().map((u) => new TrackEntity(u));
  }

  get(id: string): TrackEntity {
    const track = super.get(id);
    if (track === undefined) return track;
    return new TrackEntity(track);
  }

  update(track: TrackEntity): TrackEntity {
    super.update(track);
    return new TrackEntity(super.get(track.id));
  }

  delete(id: string): TrackEntity {
    const track = super.get(id);
    super.delete(id);
    return new TrackEntity(track);
  }
}
