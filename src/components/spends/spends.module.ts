import { Module } from '@nestjs/common';
import { SpendsResolver } from './spends.resolver';
import { SpendsService } from './spends.service';

@Module({
  providers: [SpendsResolver, SpendsService]
})
export class SpendsModule {}
