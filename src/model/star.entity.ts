import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Star extends BaseEntity {
  @ManyToOne(() => User, (user) => user.stars)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.stars)
  @JoinColumn()
  movie: Movie;

  @Column({ type: 'integer' })
  star: number;
}
