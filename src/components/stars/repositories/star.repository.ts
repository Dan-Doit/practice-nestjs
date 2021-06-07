import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, UpdateResult } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Star } from '../../../model/star.entity';

@EntityRepository(Star)
@Injectable()
export class StarRepository extends BaseRepository<Star> {
  async toggleStar(userId: number, movieId: number): Promise<number | null> {
    const data = await this.createQueryBuilder('star')
      .where('user_id = :userId', { userId })
      .andWhere('movie_id = :movieId', { movieId })
      .getOne();
    return data?.id ?? null;
  }

  async updateStar(id: number, star: number): Promise<UpdateResult> {
    return this.createQueryBuilder('star')
      .update(Star)
      .set({ star })
      .where('id = :id', { id })
      .execute();
  }
}

export const StarRepositoryProvider = {
  provide: 'StarRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(StarRepository),
  inject: [Connection],
};
