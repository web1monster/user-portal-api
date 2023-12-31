import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  IsNull,
  Not,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export class SoftDelete {
  static scope = {
    default: {
      deletedAt: IsNull(),
    },
    allEntity: {
      deletedAt: Not(IsNull()),
    },
  };

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: string;
}
