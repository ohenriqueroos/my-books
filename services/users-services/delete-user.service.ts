import UsersRepository from "../../repositories/users.repositories";

class DeleteUserService {
  async execute(id: string) {
    try {
      const user = await UsersRepository.GetById(id);

      if (!user) {
        throw new Error("User not found");
      }

      await UsersRepository.DeleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new DeleteUserService();
