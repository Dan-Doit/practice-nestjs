import { Injectable } from '@nestjs/common';
import {
  Connection,
  DeleteResult,
  EntityRepository,
  InsertResult,
} from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateUserArgs } from '../dto/create-user.dto';
import { DeleteUserArgs } from '../dto/delete-user.dto';
import { User } from '../../../model/user.entity';

@EntityRepository(User)
@Injectable()
export class UserRepository extends BaseRepository<User> {
  async allUsers(): Promise<User[]> {
    const users: Promise<User[]> = this.createQueryBuilder('user').getMany();
    return users;
  }

  async oneUser(email: string): Promise<User> {
    const user: Promise<User> = this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async addUser(args: CreateUserArgs): Promise<InsertResult> {
    const { email, avatar, name, password } = args;
    return this.createQueryBuilder('user')
      .insert()
      .into(User)
      .values({
        name,
        avatar,
        password,
        email,
      })
      .execute();
  }

  async deleteUser(args: DeleteUserArgs): Promise<DeleteResult> {
    const { email } = args;
    return this.createQueryBuilder('user')
      .delete()
      .from(User)
      .where('email = :email', { email })
      .execute();
  }

  async updateUser(
    email: string,
    avatar: string,
    name: string,
    password: string,
  ) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ name, avatar, password })
      .where('email = :email', { email })
      .execute();
  }
}

export const UserRepositoryProvider = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(UserRepository),
  inject: [Connection],
};
