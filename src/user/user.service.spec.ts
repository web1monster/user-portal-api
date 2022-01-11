import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { seedUsers } from '../seed/seed-user';
import { getFromDto } from '../common/utils/repository.util';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));

    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    jest
      .spyOn(repo, 'save')
      .mockImplementation((user: User) => getFromDto(user, new User()));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user with the payload', async () => {
    const payload = seedUsers[0];
    const createdUser = await service.add(payload);
    expect(createdUser.userId).toEqual(payload.userId);
    expect(createdUser.title).toEqual(payload.title);
    expect(createdUser.body).toEqual(payload.body);
    expect(repo.save).toBeCalled();
  });

  it('should return existing user when userId is already exists', async () => {
    const payload = seedUsers[0];
    jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(getFromDto(payload, new User()));

    const createdUser = await service.add(payload);
    expect(createdUser.userId).toEqual(payload.userId);
    expect(repo.save).not.toBeCalled();
  });
});
