import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../../model/movie.entity';
import { CreateMovieArgs } from './dto/create-movie.dto';
import { MovieRepository } from './repositories/movie.repository';

@Injectable()
export class MoviesService {
  constructor(private movieRepository: MovieRepository) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }

  async addMovie(args: CreateMovieArgs): Promise<string> {
    return this.movieRepository.addMovie(args);
  }
}
