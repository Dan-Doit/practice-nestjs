import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChargeRepository } from './repositories/charge.reposiroty';
import { Charge } from '../../model/charge.entity';

@Injectable()
export class ChargesService {
  constructor(private readonly chargeRepository: ChargeRepository) {}
  getCharges(id: number): Promise<Charge[]> {
    return this.chargeRepository.getCharges(id);
  }

  @Cron('5 * * * * *')
  async handleCron() {
    const date = new Date();
    console.log(`this will retuen when the time pointed every 5s with ${date}`);
    const data = await this.chargeRepository.allCharges();
    this.chargeRepository.toggleCharges(data);
  }
}
