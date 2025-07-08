import { User } from '@shotly/contracts/users';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export { UserEntity };
