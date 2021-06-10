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
      .leftJoinAndSelect('movie.stars', 'star', 'movie.id = star.movie_id')
      .leftJoinAndSelect(
        'movie.comments',
        'comment',
        'movie.id = comment.movie_id',
      )
      .orderBy('movie.id', 'ASC')
      .getMany()
      .then((res) => {
        res.forEach((movie) => {
          const stars = movie['stars'].map((star) => star.star);
          const arrAvg = stars.reduce((a, b) => a + b, 0) / stars.length;
          movie['avgStar'] = arrAvg ? arrAvg : 0;
        });
        return res;
      });

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
    return 'inserting is successful';
  }
}

export const MovieRepositoryProvider = {
  provide: 'MovieRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(MovieRepository),
  inject: [Connection],
};
