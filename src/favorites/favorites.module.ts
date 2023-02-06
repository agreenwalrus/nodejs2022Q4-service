import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoriteRepository } from './in-memory/favorites.repository';

@Module({
  controllers: [FavoritesController],
  providers: [FavoriteRepository, FavoritesService],
  exports: [FavoritesService],
  imports: [
    InMemoryDBModule.forFeature('track'),
    InMemoryDBModule.forFeature('album'),
    InMemoryDBModule.forFeature('artist'),
    InMemoryDBModule.forFeature('favorite'),
  ],
})
export class FavoritesModule {}
