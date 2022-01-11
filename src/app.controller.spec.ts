import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { seedUsers } from './seed/seed-user';
import { getFromDto } from './common/utils/repository.util';
import { User } from './user/entities/user.entity';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            findAll: jest
              .fn()
              .mockResolvedValue(
                seedUsers.map((u) => getFromDto(u, new User())),
              ),
            findUserByUserId: jest.fn().mockImplementation((userId: number) => {
              const found = seedUsers.find((u) => u.userId === userId);
              if (found) {
                return getFromDto(found, new User());
              } else {
                throw new NotFoundException(
                  `User does not exists for that userId - ${userId}`,
                );
              }
            }),
          };
        }
      })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return server healthy status', () => {
    expect(appController.getHealthy()).toBe(
      'User Portal API server is running.',
    );
  });

  it('should return all users using getUsers function', async () => {
    const response = await appController.getUsers();
    expect(response.length).toBe(10);
    expect(response[0].title).toBeTruthy();
    expect(response[0].body).toBeTruthy();
    expect(response[0].id).toBeTruthy();
    expect(response[0].userId).toBeTruthy();
  });

  it('should return user by userId using getUserById function', async () => {
    const response = await appController.getUserByUserId(5);
    expect(response.userId).toBe(5);
    expect(response.title).toBe('nesciunt quas odio');
    expect(response.body).toBe(
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    );
  });

  it('should return 404 not found error when user id does not exists', async () => {
    try {
      await appController.getUserByUserId(1777);
    } catch (e) {
      expect(e).toStrictEqual(
        new NotFoundException('User does not exists for that userId - 1777'),
      );
    }
  });
});
