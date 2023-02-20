import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Freddie Mercury',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Grammy', example: false })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
