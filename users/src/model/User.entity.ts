import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// types
import { UserRole } from 'nestjs-app-utils';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: UserRole;
}
