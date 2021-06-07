import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateMovieArgs } from '../dto/create-movie.dto';
import { Movie } from '../../../model/movie.entity';

@EntityRepository(Movie)
@Injectable()
export class MovieRepository extends BaseRepository<Movie> {
  async getAll(): Promise<Movie[]> {
    const movies: Promise<Movie[]> = this.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.stars', 'star', 'movie.id = star.movieId')
      // .leftJoinAndSelect('star', '"user" u', 'star."userId" = u.id')
      .getMany();
    console.log(movies);
    return movies;
  }

  async addMovie(args: CreateMovieArgs): Promise<string> {
    const { title, poster, filmed, genre, discription } = args;
    const id = await this.getAll();
    const data = this.query(
      `insert into movie values (${
        id.length + 1
      },now(),now(),'${title}','${poster}','${filmed}','${genre}','${discription}');`,
    );
    console.log(data);
    return 'inserting is successful';
  }
}

export const MovieRepositoryProvider = {
  provide: 'MovieRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(MovieRepository),
  inject: [Connection],
};
