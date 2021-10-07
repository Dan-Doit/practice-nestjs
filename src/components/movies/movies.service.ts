import { Injectable } from '@nestjs/common';
import { Movie } from '../../model/movie.entity';
import { CreateMovieArgs } from './dto/create-movie.dto';
import { MovieRepository } from './repositories/movie.repository';

@Injectable()
export class MoviesService {
  constructor(private movieRepository: MovieRepository) {}

  async getMovie(movieId: number): Promise<Movie> {
    return this.movieRepository.getMovie(movieId);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }

  async addMovie(args: CreateMovieArgs): Promise<Movie> {
    try {
      const newMovie = this.movieRepository.create(args);
      await this.movieRepository.save(newMovie);
      return newMovie;
    } catch (err) {
      throw new Error(err);
    }
  }
}
