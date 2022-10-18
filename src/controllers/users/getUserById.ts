import { usersApp } from "../../dataBase/users";
import { Request, Response } from "express";
import { User } from "../../models/user";

export class GetUserController {
  getUserById(request: Request, response: Response) {
    const data: User | undefined = usersApp.find(
      ({ id }) => id == request.params.id
    );

    return response.json(data?.toReturn());
  }
}
