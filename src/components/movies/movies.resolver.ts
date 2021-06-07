import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CreateMovieArgs } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly movieService: MoviesService) {}

  @UseGuards(GqlAuthGuard)
  @Query('all_movies')
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('add_movie')
  async addMovie(@Args() args: CreateMovieArgs) {
    return this.movieService.addMovie(args);
  }
}
