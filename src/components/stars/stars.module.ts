import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { StarsResolver } from './stars.resolver';
import {
  StarRepository,
  StarRepositoryProvider,
} from './repositories/star.repository';
import {
  MovieRepository,
  MovieRepositoryProvider,
} from '../movies/repositories/movie.repository';
import {
  UserRepository,
  UserRepositoryProvider,
} from '../users/repositories/user.repository';

@Module({
  imports: [MovieRepository, UserRepository],
  providers: [
    StarsService,
    StarsResolver,
    StarRepository,
    MovieRepository,
    MovieRepositoryProvider,
    UserRepository,
    UserRepositoryProvider,
    StarRepositoryProvider,
  ],
})
export class StarsModule {}
