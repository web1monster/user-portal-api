import { Injectable } from '@nestjs/common';

import { seedUsers } from './seed-user';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) {}

  async startSeed(): Promise<void> {
    for (const user of seedUsers) {
      // Ignore id. id will be prefilled by the database automatically.
      await this.userService.add({ ...user, id: null });
    }
  }
}
