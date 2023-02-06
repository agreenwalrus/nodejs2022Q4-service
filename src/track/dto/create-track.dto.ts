import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from 'src/utils/constants';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(UUID_VERSION)
  artistId: string | null;

  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(UUID_VERSION)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
