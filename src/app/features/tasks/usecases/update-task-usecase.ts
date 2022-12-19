import { TaskRepository } from "../repositories/task.repository";

export class UpdateTask {
  async execute(id: string, title: string, description: string) {
    const repository = new TaskRepository();
    const task = await repository.getTaskById(id);
    if (!task) {
      throw new Error("Task not found.");
    }
    task.taskUpdate(title ?? task.title, description ?? task.description);
    await repository.updateTask(task);
    console.log(task);

    return task;
  }
}
