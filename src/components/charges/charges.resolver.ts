import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { ChargesService } from './charges.service';

@Resolver()
export class ChargesResolver {
  constructor(private readonly chargesService: ChargesService) {}

  @UseGuards(GqlAuthGuard)
  @Query('get_charges')
  async getCharges(@CurrentUser() user: any) {
    const { id } = user;
    return this.chargesService.getCharges(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('charge')
  async charge() {
    return 'this will return create charge';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('cancel_charge')
  async cancelCharge() {
    return 'this will return cancel charge';
  }
}
