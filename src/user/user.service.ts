import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserArgs } from './dto/create-user.dto';
import { DeleteUserArgs } from './dto/delete-user.dto';
import { UpdateUserArgs } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRpository: UserRepository) {}

  async allUsers() {
    return this.userRpository.allUsers();
  }

  async oneUser(email: string) {
    return this.userRpository.oneUser(email);
  }

  async login(email: string) {
    return this.userRpository.oneUser(email);
  }

  async addUser(args: CreateUserArgs): Promise<string> {
    // data looked like {} have to check this out later
    this.userRpository.addUser(args);
    return 'thanks to sign up here!';
  }

  async deleteUser(args: DeleteUserArgs): Promise<string> {
    // data looked like {} have to check this out later
    this.userRpository.deleteUser(args);
    return 'thanks for using!';
  }

  async updateUser(user: any, args: UpdateUserArgs): Promise<string> {
    // data looked like {} have to check this out later
    const {
      email,
      avatar: userAvarta,
      name: userName,
      password: userPassword,
    } = user;
    const {
      avatar = userAvarta,
      name = userName,
      password = userPassword,
    } = args;
    this.userRpository.updateUser(email, avatar, name, password);
    return 'your id updated!';
  }
}
