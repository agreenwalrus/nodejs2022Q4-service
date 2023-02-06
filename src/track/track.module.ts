import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './in-memory/track.repository';

@Module({
  controllers: [TrackController],
  providers: [TrackRepository, TrackService],
  exports: [TrackService],
  imports: [
    InMemoryDBModule.forFeature('track'),
    InMemoryDBModule.forFeature('album'),
    InMemoryDBModule.forFeature('artist'),
    InMemoryDBModule.forFeature('favorite'),
  ],
})
export class TrackModule {}
