import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './in-memory/track.repository';

@Module({
  controllers: [TrackController],
  providers: [TrackRepository, TrackService]
})
export class TrackModule {}
