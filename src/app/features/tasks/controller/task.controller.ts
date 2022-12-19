import { Request, Response } from "express";
import { Task } from "../../../models/task";
import { TaskRepository } from "../repositories/task.repository";
import { archiveTask } from "../usecases/archive-task-usecase";
import { CreateTask } from "../usecases/create-task-usecase";
import { DeleteTask } from "../usecases/delete-task-usecase";
import { GetTaskById } from "../usecases/list-task-by-id-usecase";
import { GetTasksByUser } from "../usecases/list-tasks-by-user-usecase";
import { UpdateTask } from "../usecases/update-task-usecase";

export class TaskController {
  async createTask(request: Request, response: Response) {
    try {
      const { title, description } = request.body;

      const { userId } = request.params;
      console.log(userId, title, description);

      const task = new Task(title, description);

      const usecase = new CreateTask();
      const result = usecase.execute(task, userId);

      return response.status(200).json(task.toReturn());
    } catch (error: any) {
      return response.status(404).json({ message: "User not found." });
    }
  }

  async deleteTask(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const usecase = new DeleteTask();
      const result = usecase.execute(id);
      return response.status(200).json("Deleted sucessfull.");
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async findAllTasksByUser(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const usecase = new GetTasksByUser();
      const result = await usecase.execute(userId);

      return response.status(200).json(result.map((task) => task.toReturn()));
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }

  async findTaskById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const usecase = new GetTaskById();
      const result = await usecase.execute(id);
      return response.status(200).json(result.toReturn());
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { title, description } = request.body;
      const usecase = new UpdateTask();
      const result = await usecase.execute(id, title, description);

      return response.status(200).json(result.toReturn());
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async archiveTask(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { archived } = request.body;
      const usecase = new archiveTask();
      const result = await usecase.execute(id, archived);
      return response.status(200).json(result.toReturn());
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
}
