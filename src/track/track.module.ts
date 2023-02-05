import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './in-memory/track.repository';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumModule } from 'src/album/album.module';
import { forwardRef } from '@nestjs/common/utils';

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
