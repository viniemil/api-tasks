import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class EditTaskController {
  ediTask(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { title, description } = request.body;

    if (!title || !description) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => userId === user.id);

    const taskFound = user?.tasks.find((trans) => id === trans.id);

    taskFound?.transactionUpdate(title, description);

    return response.status(200).json(taskFound);
  }
}
