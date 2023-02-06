import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({ description: 'Id', format: 'UUIDv4' })
  id: string;

  @ApiProperty({ description: 'The name of the album', example: 'Innuendo' })
  name: string;

  @ApiProperty({ description: 'The year of the album', example: 1991 })
  year: number;

  @ApiProperty({
    description: 'Artist',
    nullable: true,
    format: 'UUIDv4',
  })
  artistId: string | null;

  constructor(album: Partial<AlbumEntity>) {
    Object.assign(this, album);
  }
}
