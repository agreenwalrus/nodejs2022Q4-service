import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './in-memory/artist.repository';

@Module({
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
  exports: [ArtistService],
  imports: [
    InMemoryDBModule.forFeature('track'),
    InMemoryDBModule.forFeature('album'),
    InMemoryDBModule.forFeature('artist'),
    InMemoryDBModule.forFeature('favorite'),
  ],
})
export class ArtistModule {}
