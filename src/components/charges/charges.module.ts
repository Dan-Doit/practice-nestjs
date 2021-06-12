import { Module } from '@nestjs/common';
import { ChargesResolver } from './charges.resolver';
import { ChargesService } from './charges.service';
import {
  ChargeRepository,
  ChargeRepositoryProvider,
} from './repositories/charge.reposiroty';

@Module({
  providers: [
    ChargesResolver,
    ChargesService,
    ChargeRepository,
    ChargeRepositoryProvider,
  ],
})
export class ChargesModule {}
