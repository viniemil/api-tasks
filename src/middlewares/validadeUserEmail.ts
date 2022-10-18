import { Request, Response, NextFunction } from "express";
import { usersApp } from "../dataBase/users";
import { User } from "../models/user";

export class ValidateUserEmailMiddleware {
  validateUserEmail(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const user = usersApp.find((user: User) => email === user.email);

    if (user) {
      return response.status(400).json({ message: "E-mail já utilizado. " });
    }
    return next();
  }
}
