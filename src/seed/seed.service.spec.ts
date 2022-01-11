import { Test, TestingModule } from '@nestjs/testing';

import { SeedService } from './seed.service';
import { UserService } from '../user/user.service';
import { getFromDto } from '../common/utils/repository.util';
import { User } from '../user/entities/user.entity';
import { UserDto } from '../user/dtos/user.dto';
import { seedUsers } from './seed-user';

describe('SeedService', () => {
  let seedService: SeedService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            add: jest
              .fn()
              .mockImplementation((user: UserDto) =>
                getFromDto(user, new User()),
              ),
          };
        }
      })
      .compile();

    seedService = module.get<SeedService>(SeedService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(seedService).toBeDefined();
  });

  it('should call add function for each users', async () => {
    await seedService.startSeed();
    expect(userService.add).toBeCalledTimes(seedUsers.length);
  });
});
