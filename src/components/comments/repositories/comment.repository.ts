import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, UpdateResult } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Comment } from '../../../model/comment.entity';

@EntityRepository(Comment)
@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  async createComment(userId: number, movieId: number): Promise<number | null> {
    const data = await this.createQueryBuilder('star')
      .where('"userId" = :userId', { userId })
      .andWhere('"movieId" = :movieId', { movieId })
      .getOne();
    return data?.id ?? null;
  }

  async updateComment(id: number, comment: string): Promise<UpdateResult> {
    return this.createQueryBuilder('comment')
      .update(Comment)
      .set({ comment })
      .where('id = :id', { id })
      .execute();
  }
}

export const CommentRepositoryProvider = {
  provide: 'CommentRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(CommentRepository),
  inject: [Connection],
};
