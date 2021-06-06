import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserArgs } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('all_users')
  allUsers() {
    return this.userService.allUsers();
  }

  @Query('one_user')
  oneUser(@Args() email: { email: string }) {
    const data = this.userService.oneUser(email.email);
    return data;
  }

  @Mutation('add_user')
  addUser(@Args() args: CreateUserArgs) {
    return this.userService.addUser(args);
  }
}
