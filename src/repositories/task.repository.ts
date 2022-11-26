import { TaskEntity } from "../dataBase/entities/task.entity";
import { pgHelper } from "../dataBase/pg-helper";
import { Task } from "../models/task";

export class TaskRepository {
  async saveTask(task: Task, userId: string): Promise<void> {
    const manager = pgHelper.client.manager;

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
    const manager = pgHelper.client.manager;

    const tasksEntities = await manager.find(TaskEntity, {
      where: { userId },
    });

    return tasksEntities.map((task) =>
      Task.create(task.id, task.title, task.description)
    );
  }

  async getTaskById(userId: string, taskId: string): Promise<Task> {
    const manager = pgHelper.client.manager;

    const taskEntity = await manager.findOne(TaskEntity, {
      where: { id: taskId, userId },
    });

    if (!taskEntity) throw Error("Task not found.");

    const task = Task.create(
      taskEntity.id,
      taskEntity.title,
      taskEntity.description
    );

    return task;
  }

  async removeTask(userId: string, taskId: string): Promise<void> {
    const manager = pgHelper.client.manager;

    const tasksEntities = await manager.findOneBy(TaskEntity, {
      id: taskId,
      userId: userId,
    });

    if (!tasksEntities) throw Error("Task not found.");

    await manager.delete(TaskEntity, { id: taskId, userId: userId });
  }

  async updateTask(task: Task): Promise<void> {
    const manager = pgHelper.client.manager;

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
    taskEntity.setUpdatedAt();
  }
}
