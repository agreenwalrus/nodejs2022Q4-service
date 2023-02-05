import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsUUID(4)
  @ValidateIf((obj, val) => val !== null)
  artistId: string | null;
}
