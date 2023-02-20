import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export class FavoritesEntity {
  @ApiProperty({ description: 'Favotite artists', type: [ArtistEntity] })
  artists: ArtistEntity[];

  @ApiProperty({ description: 'Favotite albums', type: [AlbumEntity] })
  albums: AlbumEntity[];

  @ApiProperty({ description: 'Favotite tracks', type: [TrackEntity] })
  tracks: TrackEntity[];

  constructor(favs: any) {
    this.artists = favs.artists.map((e) => new ArtistEntity(e.artist));
    this.albums = favs.albums.map((e) => new ArtistEntity(e.album));
    this.tracks = favs.tracks.map((e) => new ArtistEntity(e.track));
  }
}
