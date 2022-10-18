import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class DeleteTaskController {
  deleteTask(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const indexUser = user?.tasks.findIndex((task) => task.id === id) as number;

    user?.tasks.splice(indexUser, 1);

    return response.status(200).json(user?.tasks);
  }
}
