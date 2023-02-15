import { ApiProperty } from '@nestjs/swagger';
export class TrackEntity {
  @ApiProperty({ description: 'Id', format: 'UUIDv4' })
  id: string;

  @ApiProperty({
    description: 'The name of the track',
    example: 'The Show Must Go On',
  })
  name: string;

  @ApiProperty({
    description: 'Artist',
    nullable: true,
    format: 'UUIDv4',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Album',
    nullable: true,
    format: 'UUIDv4',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'In seconds',
    example: 192,
  })
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
