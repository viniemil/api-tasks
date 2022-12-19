import { Task } from "../../../models/task";
import { TaskRepository } from "../repositories/task.repository";

export class CreateTask {
  async execute(Newtask: Task, id: string) {
    const repository = new TaskRepository();

    const task = await repository.saveTask(Newtask, id);
    return task;
  }
}
