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

  constructor(track: Partial<FavoritesEntity>) {
    Object.assign(this, track);
  }
}
