import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import {
  UserRepository,
  UserRepositoryProvider,
} from './repositories/user.repository';

@Module({
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    UserRepositoryProvider,
  ],
  exports: [UserService, UserRepository, UserRepositoryProvider],
})
export class UserModule {}
