export class Favorites {
  id: string;
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(track: Partial<Favorites>) {
    Object.assign(this, track);
  }

  addArtist(artistId: string) {
    this.artists.push(artistId);
  }

  addAlbum(albumId: string) {
    this.albums.push(albumId);
  }

  addTrack(trackId: string) {
    this.tracks.push(trackId);
  }

  removeArtist(artistId: string) {
    const index = this.artists.indexOf(artistId);
    if (index !== -1) this.artists.splice(index, 1);
  }

  removeAlbum(albumId: string) {
    const index = this.albums.indexOf(albumId);
    if (index !== -1) this.albums.splice(index, 1);
  }

  removeTrack(trackId: string) {
    const index = this.tracks.indexOf(trackId);
    if (index !== -1) this.tracks.splice(index, 1);
  }
}
