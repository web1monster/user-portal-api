import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { seedUsers } from '../seed/seed-user';
import { getFromDto } from '../common/utils/repository.util';
import { NotFoundException } from '@nestjs/common';

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

    jest
      .spyOn(repo, 'save')
      .mockImplementation((user: User) => getFromDto(user, new User()));
    jest
      .spyOn(repo, 'find')
      .mockResolvedValue(seedUsers.map((u) => getFromDto(u, new User())));
    jest.spyOn(repo, 'findOne').mockImplementation((condition) => {
      const found = seedUsers.find((u) => u.userId === condition.userId);
      return found ? getFromDto(found, new User()) : null;
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user with the payload', async () => {
    const payload = seedUsers[0];

    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

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

  it('should return all users using findAll function', async () => {
    const all = await service.findAll();
    expect(all.length).toEqual(10);
  });

  it('should return specific user based on the userId', async () => {
    const found = await service.findUserByUserId(5);
    expect(found.userId).toBe(5);
    expect(found.title).toBe('nesciunt quas odio');
    expect(found.body).toBe(
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    );
  });

  it('should return 404 not found error when user id does not exists', async () => {
    try {
      await service.findUserByUserId(165);
    } catch (e) {
      expect(e).toStrictEqual(
        new NotFoundException('User does not exists for that userId - 165'),
      );
    }
  });
});
