// import { Injectable } from '@nestjs/common';
// import { Connection, EntityRepository } from 'typeorm';
// import { BaseRepository } from 'typeorm-transactional-cls-hooked';
// import { Charge } from '../../../model/charge.entity';

// @EntityRepository(Charge)
// @Injectable()
// export class ChargeRepository extends BaseRepository<Charge> {
//   async getCharges() {
//     return;
//   }
// }

// export const ChargeRepositoryProvider = {
//   provide: 'ChargeRepository',
//   useFactory: (connection: Connection) =>
//     connection.getCustomRepository(Charge),
//   inject: [Connection],
// };
