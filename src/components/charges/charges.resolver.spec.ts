import { Test, TestingModule } from '@nestjs/testing';
import { ChargesResolver } from './charges.resolver';

describe('ChargesResolver', () => {
  let resolver: ChargesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargesResolver],
    }).compile();

    resolver = module.get<ChargesResolver>(ChargesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
