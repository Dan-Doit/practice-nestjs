import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserArgs } from './dto/create-user.dto';

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
}
