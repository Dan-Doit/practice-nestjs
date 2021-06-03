import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Spend extends BaseEntity {
  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie)
  movie: Movie;

  @Column({ type: 'integer', nullable: true })
  point: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  valid: boolean;
}
