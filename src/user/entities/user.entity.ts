import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class User implements InMemoryDBEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
