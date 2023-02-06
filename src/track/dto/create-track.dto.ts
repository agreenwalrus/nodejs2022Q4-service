import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID_VERSION } from 'src/utils/constants';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    example: 'The Show Must Go On',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Artist',
    nullable: true,
    format: 'UUIDv4',
  })
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(UUID_VERSION)
  artistId: string | null;

  @ApiProperty({
    description: 'Album',
    nullable: true,
    format: 'UUIDv4',
  })
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(UUID_VERSION)
  albumId: string | null;

  @ApiProperty({
    description: 'In seconds',
    example: 192,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
