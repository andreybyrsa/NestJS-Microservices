import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "./User.enum";
import { Comment } from "../Comment/Comment.entity";

/**
 * Модель User в бд
 */
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
