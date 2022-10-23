import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";
import { Task } from "../../models/task";

export class BalanceTransactionController {
  GetbalanceTransaction(request: Request, response: Response) {
    const { userId } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const tasks = user?.tasks.map((task: Task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        archived: task.archived,
      };
    });
    console.log(tasks);

    return response.status(200).json(tasks);
  }
}
