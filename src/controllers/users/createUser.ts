import { Request, Response } from "express";
import { usersApp } from "../../dataBase/users";
import { User } from "../../models/user";

export class CreateNewuser {
  createUser(request: Request, response: Response) {
    const { password, name, cpf, email, age } = request.body;

    const user = new User(password, name, cpf, email, age);

    usersApp.push(user);

    return response.json(user.toReturn());
  }
}
