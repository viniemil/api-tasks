import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Timestamp,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "tasks", schema: "tasksBD" })
export class TaskEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  archived!: boolean;

  @Column({ name: "id_user" })
  userId!: string;

  @Column({ name: "updated_at" })
  updated!: number;

  @BeforeUpdate()
  setUpdatedAt(): void {
    const timestamp = Number(new Date().getTime);
    this.updated = timestamp;
  }

  @ManyToOne(() => UserEntity, (tasks) => TaskEntity)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  userEntity?: UserEntity;
}
