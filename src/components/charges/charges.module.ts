import { Module } from '@nestjs/common';
import { ChargesResolver } from './charges.resolver';
import { ChargesService } from './charges.service';

@Module({
  providers: [ChargesResolver, ChargesService],
})
export class ChargesModule {}
