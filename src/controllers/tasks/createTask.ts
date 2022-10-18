import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";
import { Task } from "../../models/task";

export class CreateNewTaskController {
  createTask(request: Request, response: Response) {
    const { title, description } = request.body;

    const { id } = request.params;

    if (!title || !description) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => id === user.id);

    const task = new Task(title, description);

    user?.tasks.push(task);

    return response.status(200).json({
      id: user?.id,
      name: user?.name,
      cpf: user?.cpf,
      email: user?.email,
      age: user?.age,
      transactions: user?.tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          value: task.description,
        };
      }),
    });
  }
}
