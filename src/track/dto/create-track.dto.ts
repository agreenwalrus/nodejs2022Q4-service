import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateIf,
  NotEquals,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  artistId: string | null;

  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @IsUUID(4)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
