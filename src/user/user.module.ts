import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [InMemoryDBModule.forRoot({})],
})
export class UserModule {}
