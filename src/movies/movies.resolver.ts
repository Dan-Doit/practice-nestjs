import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CreateMovieArgs } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly movieService: MoviesService) {}

  @Query('all_movies')
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Mutation('add_movie')
  async addMovie(@Args() args: CreateMovieArgs) {
    return this.movieService.addMovie(args);
  }
}
