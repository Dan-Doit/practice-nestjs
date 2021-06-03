import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly movieService: MoviesService) {}

  @Query('all_movies')
  async getAllMovies() {
    return 'this will return movies';
  }

  @Mutation('add_movie')
  async addMovie() {
    return 'this will add movie';
  }
}
