import { UserEntity } from "../dataBase/entities/user.entity";
import { pgHelper } from "../dataBase/pg-helper";
import { Task } from "../models/task";
import { User } from "../models/user";

export class UserRepository {
  async findUsers(): Promise<User[]> {
    const manager = pgHelper.client.manager;

    const userEntities = await manager.find(UserEntity);

    return userEntities.map((row) => {
      return User.create(
        row.id,
        row.password,
        row.name,
        row.age,
        row.cpf,
        row.email
      );
    });
  }

  async saveUsers(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

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
    const manager = pgHelper.client.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { id },
      relations: ["tasksEntities"],
    });

    if (!userEntity) return undefined;

    const tasks = userEntity.tasksEntities
      ? userEntity.tasksEntities.map((entity) =>
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
    const manager = pgHelper.client.manager;

    const userEntity = await manager.findOneBy(UserEntity, { id });

    if (!userEntity) throw Error("User not found.");

    await manager.delete(UserEntity, { id });
  }

  async updateUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

    // const userEntity = await manager.findOne(UserEntity, {
    //   where: { id: user.id },
    // });

    try {
      await manager.update(
        UserEntity,
        { id: user.id },
        {
          name: user.name,
          email: user.email,
          age: user.age,
          password: user.password,
        }
      );
    } catch (error: any) {
      throw new Error("User not found.");
    }
  }
}
