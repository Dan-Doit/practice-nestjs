import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Spend } from './spend.entity';
import { Star } from './star.entity';
import { Comment } from './comment.entity';

@Entity()
export class Movie extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  poster: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  filmed: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ type: 'varchar', length: 300 })
  discription: string;

  @OneToMany(() => Star, (star) => star.movie)
  stars: Star[];

  @OneToMany(() => Spend, (spend) => spend.movie)
  spends: Spend[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];
}
