import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { seedUsers } from '../seed/seed-user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker((token) => {
        if (token === 'UserRepository') {
          return {
            findOne: jest
              .fn()
              .mockImplementation((condition) =>
                seedUsers.find((u) => u.userId === condition.userId),
              ),
            save: jest.fn().mockImplementation((user: User) => user),
          };
        }
      })
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
