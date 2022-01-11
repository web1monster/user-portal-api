import { Column, Entity } from 'typeorm';

import { SoftDelete } from '../../common/core/soft-delete';
import { UserDto } from '../dtos/user.dto';

@Entity('user')
export class User extends SoftDelete {
  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  body: string;

  toUserDto(): UserDto {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
    };
  }
}
