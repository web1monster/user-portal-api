import { SoftDelete } from '../../common/core/soft-delete';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends SoftDelete {
  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  body: string;
}
