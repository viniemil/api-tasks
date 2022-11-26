import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity({ name: "users", schema: "tasksBD" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

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

  @OneToMany(() => TaskEntity, (entity) => entity.userEntity, { eager: true })
  tasksEntities?: TaskEntity[];
}
