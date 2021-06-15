import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Charge } from '../../../model/charge.entity';

@EntityRepository(Charge)
@Injectable()
export class ChargeRepository extends BaseRepository<Charge> {
  async getCharges(id: number): Promise<Charge[]> {
    return this.createQueryBuilder('charge')
      .where('user_id = :id', { id })
      .getMany();
  }

  async allCharges(): Promise<Charge[]> {
    return this.createQueryBuilder('charge').getMany();
  }

  async toggleCharges(charges: Charge[]) {
    charges.forEach(async (charge) => {
      await this.createQueryBuilder('charge')
        .update(Charge)
        .set({ valid: !charge.valid })
        .where('id = :id', { id: charge.id })
        .execute();
    });
  }

  // async expireCheck(){
  //   const expirationEstimate = await this.createQueryBuilder('estimate')
  //   .select(['estimate.id'])
  //   .where('estimate.status = :status', {
  //     status: EstimateStatus.SUBMITTED,
  //   })
  //   .andWhere('now() >= estimate.end_date')
  //   .getMany();

  // const ids = expirationEstimate.map(res => res.id);

  // if (ids.length) {
  //   return this.createQueryBuilder('estimate')
  //     .update(Estimate)
  //     .set({ status: EstimateStatus.EXPIRED })
  //     .where('estimate.id IN (:...ids)', { ids: ids })
  //     .execute();
  // } else {
  //   return null;
  // }
  // }
}

export const ChargeRepositoryProvider = {
  provide: 'ChargeRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ChargeRepository),
  inject: [Connection],
};
