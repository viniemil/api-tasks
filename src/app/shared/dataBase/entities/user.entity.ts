import { Column, Entity, OneToMany } from "typeorm";
import { EntityBase } from "./base.entity";
import { TaskEntity } from "./task.entity";

@Entity({ name: "users", schema: "tasksBD" })
export class UserEntity extends EntityBase {
  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;

  @Column()
  cpf!: string;

  @OneToMany(() => TaskEntity, (entity) => entity.userEntity)
  tasksEntities?: TaskEntity[];
}
