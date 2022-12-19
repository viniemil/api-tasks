import { TaskRepository } from "../repositories/task.repository";

export class archiveTask {
  async execute(id: string, archived: boolean) {
    if (archived !== true && archived !== false) {
      throw new Error("Invalid Data.");
    }
    const repository = new TaskRepository();
    const task = await repository.getTaskById(id);

    if (!task) {
      throw new Error("Task Not Found.");
    }
    task.archivedTask(archived);
    await repository.updateTask(task);
    return task;
  }
}
