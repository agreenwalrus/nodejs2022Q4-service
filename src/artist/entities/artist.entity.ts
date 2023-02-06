import { ApiProperty } from '@nestjs/swagger';
export class ArtistEntity {
  @ApiProperty({ description: 'Id', format: 'UUIDv4' })
  id: string;

  @ApiProperty({
    description: 'The name of the artist',
    example: 'Freddie Mercury',
  })
  name: string;

  @ApiProperty({ description: 'Grammy', example: false })
  grammy: boolean;

  constructor(album: Partial<ArtistEntity>) {
    Object.assign(this, album);
  }
}
