import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;
}
