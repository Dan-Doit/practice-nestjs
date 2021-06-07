import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { StarsService } from './stars.service';
import { UseGuards } from '@nestjs/common';
import { CreateStarDTO } from './dto/create-star.dto';
import { CurrentUser } from '../../auth/current-user.decorator';

@Resolver()
export class StarsResolver {
  constructor(private readonly starsService: StarsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation('create_star')
  async create_star(@CurrentUser() user: any, @Args() starData: CreateStarDTO) {
    return this.starsService.createStar(user, starData);
  }
}
