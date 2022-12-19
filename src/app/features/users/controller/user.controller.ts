import { UserRepository } from "../repositories/user.repository";
import { Request, Response } from "express";
import { User } from "../../../models/user";
import { ListAllUsers } from "../usecases/list-all-user.usecase";
import { CreateUser } from "../usecases/create-user.usecase";
import { ListUserById } from "../usecases/list-user-by-id.usecase";
import { DeleteUser } from "../usecases/delete-user.usecase";
import { UpdateUser } from "../usecases/update-user.usecase";

export class UserController {
  async getAll(request: Request, response: Response) {
    try {
      const usecase = new ListAllUsers();

      const result = await usecase.execute();

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }

  async createUser(request: Request, response: Response) {
    try {
      const { password, name, cpf, email, age } = request.body;

      const user = new User(password, name, cpf, email, age);

      const usecase = new CreateUser();

      const result = await usecase.execute(user);

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }

  async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const usecase = new ListUserById();
      const result = await usecase.execute(id);

      return response.status(200).json(result?.toReturn());
    } catch (error) {
      return response.status(404).json({ error: "User not found." });
    }
  }

  async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const usecase = new DeleteUser();
      const result = usecase.execute(id);
      return response.status(200).json();
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, age, email, password } = request.body;
      const usecase = new UpdateUser();
      const result = usecase.execute(id, name, age, email, password);
      return response.json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
