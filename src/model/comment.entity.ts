import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column({ type: 'varchar', length: 300, nullable: true })
  comment: string;
}
