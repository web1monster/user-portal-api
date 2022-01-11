import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthy(): string {
    return 'User Portal API server is running.';
  }
}
