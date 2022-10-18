import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class GetTaskController {
  getTask(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const taskFound = user?.tasks.find((task) => id === task.id);

    return response.status(200).json(taskFound?.toReturn());
  }
}
