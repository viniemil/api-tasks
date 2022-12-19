import { UserRepository } from "../repositories/user.repository";

export class ListUserById {
  async execute(id: string) {
    const repository = new UserRepository();
    const users = await repository.findByIdUser(id);

    return users;
  }
}
