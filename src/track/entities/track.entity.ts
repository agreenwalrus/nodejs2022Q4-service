import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class TrackEntity implements InMemoryDBEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
