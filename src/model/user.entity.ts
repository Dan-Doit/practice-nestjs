import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  token: string;

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
}
