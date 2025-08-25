import UsersRepository from "../../repositories/users.repositories";

class GetUsersService {
  async execute() {
    try {
      const users = await UsersRepository.GetAll();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export default new GetUsersService();
