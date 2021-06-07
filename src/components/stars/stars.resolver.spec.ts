import { Test, TestingModule } from '@nestjs/testing';
import { StarsResolver } from './stars.resolver';

describe('StarsResolver', () => {
  let resolver: StarsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarsResolver],
    }).compile();

    resolver = module.get<StarsResolver>(StarsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
