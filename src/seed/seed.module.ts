import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SeedService],
  imports: [UserModule],
})
export class SeedModule {}
