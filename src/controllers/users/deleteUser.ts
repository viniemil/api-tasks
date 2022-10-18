import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class DeleteUserController {
  deleteUser(request: Request, response: Response) {
    const userId = request.params.id;

    const indexUser = usersApp.findIndex((user) => user.id === userId);

    usersApp.splice(indexUser, 1);

    if (usersApp.length === 0) {
      return response
        .status(200)
        .json({ message: "Não há usuários cadastrados." });
    }

    return response.status(200).json(
      usersApp.map((user) => {
        return {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        };
      })
    );
  }
}
