import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID_VERSION } from 'src/utils/constants';

export class CreateAlbumDto {
  @ApiProperty({ description: 'The name of the album', example: 'Innuendo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The year of the album', example: 1991 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Artist',
    nullable: true,
    format: 'UUIDv4',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  @ValidateIf((obj, val) => val !== null)
  artistId: string | null;
}
