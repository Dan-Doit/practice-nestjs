import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie)
  movie: Movie;

  @Column({ type: 'varchar', length: 300, nullable: true })
  comment: string;
}