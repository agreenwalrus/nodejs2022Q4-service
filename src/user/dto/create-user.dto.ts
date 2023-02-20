import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'TestUser',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Password',
    example: 'psw',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
