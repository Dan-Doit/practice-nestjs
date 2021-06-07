import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateUserArgs } from './dto/create-user.dto';
import { DeleteUserArgs } from './dto/delete-user.dto';
import { UpdateUserArgs } from './dto/update-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query('all_users')
  allUsers() {
    return this.userService.allUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query('one_user')
  oneUser(@Args() email: { email: string }) {
    const data = this.userService.oneUser(email.email);
    return data;
  }

  @Mutation('add_user')
  addUser(@Args() args: CreateUserArgs) {
    return this.userService.addUser(args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('delete_user')
  deleteUser(@Args() args: DeleteUserArgs) {
    return this.userService.deleteUser(args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('update_user')
  updateUser(@CurrentUser() user: any, @Args() args: UpdateUserArgs) {
    return this.userService.updateUser(user, args);
  }
}
