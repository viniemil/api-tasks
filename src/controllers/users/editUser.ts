import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";

export class EditUserController {
  editUser(request: Request, response: Response) {
    const user = usersApp.find(({ id }) => request.params.id === id);
    const { name, age } = request.body;

    user?.userUpdate(name, age);

    return response.json(user?.toReturn());
  }
}
