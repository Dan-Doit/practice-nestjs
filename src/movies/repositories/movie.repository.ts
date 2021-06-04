import { Injectable, Logger } from '@nestjs/common';
import { Connection, EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateMovieArgs } from '../dto/create-movie.dto';
import { Movie } from '../../model/movie.entity';

@EntityRepository(Movie)
@Injectable()
export class MovieRepository extends BaseRepository<Movie> {
  async getAll(): Promise<Movie[]> {
    const movies: Promise<Movie[]> = await this.query(
      'select * from movie',
    ).then((movies) =>
      movies.map((movie) => {
        movie.createdAt = movie.created_at.toString();
        movie.updatedAt = movie.updated_at.toString();
        delete movie.created_at;
        delete movie.updated_at;
        return movie;
      }),
    );

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
    Logger.log(JSON.stringify(data));
    return 'inserting is successful';
  }
}

export const FileRepositoryProvider = {
  provide: 'movieRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(Movie),
  inject: [Connection],
};
