import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import {
  MovieRepository,
  MovieRepositoryProvider,
} from './repositories/movie.repository';

@Module({
  providers: [
    MoviesResolver,
    MoviesService,
    MovieRepository,
    MovieRepositoryProvider,
  ],
  exports: [MovieRepository, MovieRepositoryProvider],
})
export class MoviesModule {}
