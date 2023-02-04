import { IsNotEmpty, IsUUID } from 'class-validator';

export class UuidParameterDto {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
