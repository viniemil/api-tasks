import { Request, Response, NextFunction } from "express";
import { usersApp } from "../dataBase/users";

export class validateTaskMiddlewares {
  validateTask(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;

    if (!id) {
      return response.status(404);
    }

    const userFound = usersApp.find((user) => user.id === userId);

    const taskFound = userFound?.tasks.find((tasks) => tasks.id === id);

    if (!taskFound) {
      return response.status(404).json({ message: "Transação não encontrada" });
    }
    return next();
  }
}
