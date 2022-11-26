import { UserRepository } from "../repositories/user.repository";
import { Request, Response } from "express";
import { User } from "../models/user";

export class UserController {
  async getAll(request: Request, response: Response) {
    const repository = new UserRepository();
    const users = await repository.findUsers();

    return response.status(200).json(users.map((user) => user.toReturn()));
  }

  async createUser(request: Request, response: Response) {
    const { password, name, cpf, email, age } = request.body;

    const user = new User(password, name, cpf, email, age);

    const repository = new UserRepository();

    await repository.saveUsers(user);

    return response.json(user.toReturn());
  }

  async getUserById(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new UserRepository();

    const user = await repository.findByIdUser(id);

    if (!user) {
      return response.status(404).json({ error: "User not found." });
    }

    return response.status(200).json(user.toReturn());
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new UserRepository();
    try {
      await repository.removeUser(id);
      return response.status(200).json();
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const { name, age, email, password } = request.body;

    const repository = new UserRepository();

    const user = await repository.findByIdUser(id);

    if (!user) {
      return response.status(404).json({ error: "User not found." });
    }

    try {
      user.userUpdate(name, age, password, email);
      await repository.updateUser(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.json(user.toReturn());
  }
}
