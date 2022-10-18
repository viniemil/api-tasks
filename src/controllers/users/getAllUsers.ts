import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class GetAllUsersController {
  getAll(request: Request, response: Response) {
    if (usersApp.length === 0) {
      return response
        .status(404)
        .json({ message: "Não há usuários cadastrados." });
    }

    const data = usersApp.map((user) => {
      return {
        id: user.id,
        password: user.password,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        age: user.age,
      };
    });

    return response.status(200).json(data);
  }
}
