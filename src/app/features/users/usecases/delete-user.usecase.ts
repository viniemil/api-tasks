import { UserRepository } from "../repositories/user.repository";

export class DeleteUser {
  async execute(id: string) {
    const repository = new UserRepository();
    const user = await repository.findByIdUser(id);

    if (!user) {
      throw new Error("User Not Found");
    }

    await repository.removeUser(id);
  }
}
