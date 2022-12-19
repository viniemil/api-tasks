import { UserRepository } from "../repositories/user.repository";

export class UpdateUser {
  async execute(
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
  ) {
    const repository = new UserRepository();

    const user = await repository.updateUser(id, name, email, age, password);
  }
}
