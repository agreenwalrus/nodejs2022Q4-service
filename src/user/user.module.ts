import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './in-memory/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  imports: [InMemoryDBModule.forFeature('user')],
})
export class UserModule {}
