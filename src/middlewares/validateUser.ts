import { Request, Response, NextFunction } from "express";
import { usersApp } from "../dataBase/users";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class ValidateUserMiddleware {
  async validateUser(request: Request, response: Response, next: NextFunction) {
    const { userId, id } = request.params;

    const repository = new UserRepository();

    try {
      await repository.findByIdUser(userId);
      return next();
    } catch (error: any) {
      return response.status(500).json({ message: "User not found." });
    }
  }
}
