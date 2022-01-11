import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { getFromDto } from '../common/utils/repository.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async add(payload: UserDto): Promise<User> {
    const found = await this.userRepository.findOne({ userId: payload.userId });
    if (found) {
      return found;
    }
    const user: User = getFromDto(payload, new User());
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserByUserId(userId: number): Promise<User> {
    const found = await this.userRepository.findOne({ userId });
    if (found) {
      return found;
    }
    throw new NotFoundException(
      `User does not exists for that userId - ${userId}`,
    );
  }
}
