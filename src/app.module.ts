import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';

import * as ormConfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
