import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Charge extends BaseEntity {
  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column({ type: 'integer', nullable: true })
  point: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  chargedby: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  valid: boolean;
}
