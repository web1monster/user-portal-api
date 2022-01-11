import { Test, TestingModule } from '@nestjs/testing';

import { SeedService } from './seed.service';
import { UserService } from '../user/user.service';
import { seedUsers } from './seed-user';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            add: jest.fn().mockResolvedValue(seedUsers[0]),
          };
        }
      })
      .compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
