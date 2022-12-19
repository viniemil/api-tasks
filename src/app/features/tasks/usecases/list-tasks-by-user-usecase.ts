import { TaskRepository } from "../repositories/task.repository";

export class GetTasksByUser {
  async execute(userId: string) {
    const repository = new TaskRepository();

    const tasks = await repository.getTasksByUser(userId);

    return tasks;
  }
}
