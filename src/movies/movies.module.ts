import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  providers: [MoviesResolver, MoviesService, MovieRepository],
})
export class MoviesModule {}
