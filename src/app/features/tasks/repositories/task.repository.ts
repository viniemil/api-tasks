import { TaskEntity } from "../../../shared/dataBase/entities/task.entity";
import { Task } from "../../../models/task";
import dataSource from "../../../../main/database/database-connection";

export class TaskRepository {
  async saveTask(task: Task, userId: string): Promise<void> {
    const manager = dataSource.manager;

    const taskEntity = await manager.create(TaskEntity, {
      id: task.id,
      title: task.title,
      description: task.description,
      archived: task.archived,
      userId: userId,
    });

    await manager.save(taskEntity);
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    const manager = dataSource.manager;

    const tasksEntities = await manager.find(TaskEntity, {
      where: { userId },
    });

    return tasksEntities.map((task) =>
      Task.create(task.id, task.title, task.description)
    );
  }

  async getTaskById(taskId: string): Promise<Task> {
    const manager = dataSource.manager;

    const taskEntity = await manager.findOne(TaskEntity, {
      where: { id: taskId },
    });

    if (!taskEntity) throw Error("Task not found.");

    const task = Task.create(
      taskEntity.id,
      taskEntity.title,
      taskEntity.description
    );

    return task;
  }

  async removeTask(taskId: string): Promise<void> {
    const manager = dataSource.manager;

    const tasksEntities = await manager.findOneBy(TaskEntity, {
      id: taskId,
    });

    if (!tasksEntities) throw Error("Task not found.");

    await manager.delete(TaskEntity, { id: taskId });
  }

  async updateTask(task: Task): Promise<void> {
    const manager = dataSource.manager;

    const taskEntity = await manager.findOne(TaskEntity, {
      where: { id: task.id },
    });

    if (!taskEntity) throw Error("Task not found.");

    await manager.update(
      TaskEntity,
      { id: task.id },
      {
        title: task.title,
        description: task.description,
        archived: task.archived,
      }
    );
  }
}
