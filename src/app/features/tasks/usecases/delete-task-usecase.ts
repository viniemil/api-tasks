import { TaskRepository } from "../repositories/task.repository";

export class DeleteTask {
  async execute(id: string) {
    const repository = new TaskRepository();
    const task = await repository.removeTask(id);
    return task;
  }
}
