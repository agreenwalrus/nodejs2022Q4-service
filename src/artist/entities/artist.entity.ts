export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(album: Partial<ArtistEntity>) {
    Object.assign(this, album);
  }
}
