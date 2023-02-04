import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './in-memory/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  imports: [],
})
export class UserModule {}
