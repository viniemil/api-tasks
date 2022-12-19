import { UserRepository } from "../repositories/user.repository";

export class ListAllUsers {
  async execute() {
    const repository = new UserRepository();
    const users = await repository.findUsers();

    return users;
  }
}
