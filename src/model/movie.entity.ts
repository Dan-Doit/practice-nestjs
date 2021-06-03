import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
