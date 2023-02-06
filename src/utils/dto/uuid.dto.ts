import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID_VERSION } from '../constants';

export class UuidParameterDto {
  @IsUUID(UUID_VERSION)
  @IsNotEmpty()
  id: string;
}
