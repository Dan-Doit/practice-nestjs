import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/auth-guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //   @UseGuards(GqlAuthGuard)
  @Mutation('login')
  async login(@Args() authData: { email: string; pass: string }) {
    return this.authService.login(authData);
  }
}
