import { User } from '../user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

export class UsersRepository extends InMemoryDBService<User> {}
