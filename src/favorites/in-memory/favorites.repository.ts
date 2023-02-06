import { Injectable } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Favorites } from '../entities/favorites.internal';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectInMemoryDBService('favorite')
    private readonly db: InMemoryDBService<Favorites>,
  ) {
    this.db.create(new Favorites({ tracks: [], albums: [], artists: [] }));
  }

  get(): Favorites {
    return this.db
      .getAll()
      .map((u) => new Favorites(u))
      .pop();
  }

  update(favorites: Favorites): Favorites {
    this.db.update(favorites);
    return new Favorites(this.db.get(favorites.id));
  }
}
