import { Request, Response } from "express";
import { Task } from "../models/task";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  async createTask(request: Request, response: Response) {
    const { title, description } = request.body;

    const { id } = request.params;

    if (!title || !description) {
      return response.status(400).json({ message: "Invalid Data." });
    }

    const task = new Task(title, description);

    const repository = new TaskRepository();

    try {
      await repository.saveTask(task, id);
      return response.status(200).json(task.toReturn());
    } catch (error: any) {
      return response.status(404).json({ message: "User not found." });
    }
  }

  async deleteTask(request: Request, response: Response) {
    const { userId, id } = request.params;

    const repository = new TaskRepository();

    try {
      await repository.removeTask(userId, id);
      return response.status(200).json("Deleted sucessfull.");
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async findAllTasksByUser(request: Request, response: Response) {
    const { userId, id } = request.params;

    const repository = new TaskRepository();

    const tasks = await repository.getTasksByUser(userId);

    return response.status(200).json(tasks.map((task) => task.toReturn()));
  }

  async findTaskById(request: Request, response: Response) {
    const { userId, id } = request.params;

    const repository = new TaskRepository();

    try {
      const task = await repository.getTaskById(userId, id);
      return response.status(200).json(task.toReturn());
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { title, description } = request.body;

    if (!title || !description) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const repository = new TaskRepository();

    const task = await repository.getTaskById(userId, id);

    if (!task) {
      return response.status(404).json({ error: "Task not found." });
    }

    try {
      task.taskUpdate(title, description);
      await repository.updateTask(task);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(200).json(task.toReturn());
  }

  async archiveTask(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { archived } = request.body;

    if (archived !== true && archived !== false) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const repository = new TaskRepository();

    const task = await repository.getTaskById(userId, id);

    if (!task) {
      return response.status(404).json({ message: "Task not found." });
    }

    try {
      task.archivedTask(archived);
      await repository.updateTask(task);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
    return response.status(200).json(task.toReturn());
  }
}
