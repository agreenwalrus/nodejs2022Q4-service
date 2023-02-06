import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from 'src/utils/constants';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  @ValidateIf((obj, val) => val !== null)
  artistId: string | null;
}
