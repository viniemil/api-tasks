import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class ArqhiveTaskController {
  archiveTask(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { archived } = request.body;

    if (!archived) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => userId === user.id);

    const taskFound = user?.tasks.find((trans) => id === trans.id);

    taskFound?.archivedTask(archived);

    return response.status(200).json(taskFound);
  }
}
