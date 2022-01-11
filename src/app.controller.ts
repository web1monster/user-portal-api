import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { UserDto } from './user/dtos/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('General')
  @Get()
  getHealthy(): string {
    return this.appService.getHealthy();
  }

  @ApiTags('User')
  @Get('posts')
  @ApiOkResponse({ type: UserDto, isArray: true })
  async getUsers() {
    const users = await this.userService.findAll();
    return users.map((user) => user.toUserDto());
  }

  @ApiTags('User')
  @Get('posts/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserDto })
  async getUserByUserId(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.findUserByUserId(id);
    return user.toUserDto();
  }
}
