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

  async getMovie(movieId: number): Promise<Movie> {
    return this.createQueryBuilder('movie')
      .where('movie.id = :movieId', { movieId })
      .getOne();
  }

  async addMovie(args: CreateMovieArgs): Promise<string> {
    const { title, poster, filmed, genre, discription } = args;
    const id = await this.getAll();
    const data = this.query(
      `insert into movie values (${
        id.length + 1
      },now(),now(),'${title}','${poster}','${filmed}','${genre}','${discription}');`,
    );
    return data;
  }

  async countMovie(id: number) {
    return this.query(
      `select
      (select COUNT(CASE WHEN message.status != 'APPROVAL' THEN 1 END) 컨펌받아야할것
      from message
      where message.member_id = 3 and type = 'MASTER' and action = 'PROJECT'),
        COUNT(CASE WHEN project.status IN ('CREATED','SELECTED_ESTIMATE') THEN 1 END) 생성되거나선택,
        COUNT(CASE WHEN project.status = 'ING' THEN 1 END) 진행중
        from project
        where project.master_id = ${id}`,
    );
  }
}

export const MovieRepositoryProvider = {
  provide: 'MovieRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(MovieRepository),
  inject: [Connection],
};
