export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: Partial<AlbumEntity>) {
    Object.assign(this, album);
  }
}
