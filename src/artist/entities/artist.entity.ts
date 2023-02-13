import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';
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

  constructor(album: Partial<Artist>) {
    Object.assign(this, album);
  }
}
