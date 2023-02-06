import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './in-memory/album.repository';

@Module({
  controllers: [AlbumController],
  providers: [AlbumRepository, AlbumService],
  exports: [AlbumService],
  imports: [
    InMemoryDBModule.forFeature('album'),
    InMemoryDBModule.forFeature('track'),
    InMemoryDBModule.forFeature('artist'),
    InMemoryDBModule.forFeature('favorite'),
  ],
})
export class AlbumModule {}
