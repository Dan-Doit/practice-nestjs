import { Column, Entity, OneToMany } from 'typeorm';
import { Star } from './star.entity';
import { BaseEntity } from './base.entity';
import { Spend } from './spend.entity';
import { Comment } from './comment.entity';
import { Charge } from './charge.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 10, default: 'user' })
  role: string;

  @OneToMany(() => Star, (star) => star.user)
  stars: Star[];

  @OneToMany(() => Spend, (spend) => spend.user)
  spends: Spend[];

  @OneToMany(() => Charge, (charge) => charge.user)
  charges: Charge[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
