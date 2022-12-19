import { UserEntity } from "../../../shared/dataBase/entities/user.entity";
import { Task } from "../../../models/task";
import { User } from "../../../models/user";
import dataSource from "../../../../main/database/database-connection";

export class UserRepository {
  async findUsers(): Promise<any> {
    const manager = dataSource.manager;

    const userEntities = await manager.find(UserEntity);
    console.log(userEntities);

    const list = userEntities.map((row: any) => {
      return new User(
        row.password,
        row.name,
        row.age,
        row.cpf,
        row.email,
        row.id
      ).toReturn();
    });

    return list;
  }

  async saveUsers(user: User): Promise<void> {
    const manager = dataSource.manager;
    const userEntity = manager.create(UserEntity, {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      age: user.age,
      cpf: user.cpf,
    });

    await manager.save(userEntity);
  }

  async findByIdUser(id: string): Promise<User | undefined> {
    const manager = dataSource.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { id },
      relations: ["tasksEntities"],
    });

    if (!userEntity) return undefined;

    const tasks = userEntity.tasksEntities
      ? userEntity.tasksEntities.map((entity: any) =>
          Task.create(entity.id, entity.title, entity.description)
        )
      : undefined;

    const user = User.create(
      userEntity.id,
      userEntity.password,
      userEntity.name,
      userEntity.age,
      userEntity.cpf,
      userEntity.email,
      tasks
    );

    return user;
  }

  async removeUser(id: string): Promise<void> {
    const manager = dataSource.manager;

    const userEntity = await manager.findOneBy(UserEntity, { id });

    if (!userEntity) throw Error("User not found.");

    await manager.delete(UserEntity, { id });
  }

  async updateUser(
    id: string,
    name?: string,
    email?: string,
    age?: number,
    password?: string
  ): Promise<void> {
    const manager = dataSource.manager;

    try {
      await manager.update(
        UserEntity,
        { id: id },
        {
          name: name,
          email: email,
          age: age,
          password: password,
        }
      );
    } catch (error: any) {
      throw new Error("User not found.");
    }
  }
}
