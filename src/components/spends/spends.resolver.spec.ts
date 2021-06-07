import { Test, TestingModule } from '@nestjs/testing';
import { SpendsResolver } from './spends.resolver';

describe('SpendsResolver', () => {
  let resolver: SpendsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendsResolver],
    }).compile();

    resolver = module.get<SpendsResolver>(SpendsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
