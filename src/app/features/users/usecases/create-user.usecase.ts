import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";

export class CreateUser {
  async execute(NewUser: User) {
    const repository = new UserRepository();
    const user = await repository.saveUsers(NewUser);

    return user;
  }
}
