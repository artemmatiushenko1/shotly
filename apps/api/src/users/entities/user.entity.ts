import { User } from '@shotly/contracts/users';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash } from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Entity()
class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const passwordHash = await hash(this.password, SALT_OR_ROUNDS);
      this.password = passwordHash;
    }
  }
}

export { UserEntity };
