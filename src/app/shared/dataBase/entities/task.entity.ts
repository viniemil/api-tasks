import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityBase } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "tasks", schema: "tasksBD" })
export class TaskEntity extends EntityBase {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  archived!: boolean;

  @Column({ name: "id_user" })
  userId!: string;

  @ManyToOne(() => UserEntity, (tasks) => TaskEntity)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  userEntity?: UserEntity;
}
