import { TaskRepository } from "../repositories/task.repository";

export class GetTaskById {
  async execute(id: string) {
    const repository = new TaskRepository();
    const task = await repository.getTaskById(id);
    return task;
  }
}
