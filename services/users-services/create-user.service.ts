import { UserDto } from "../../dtos/users.dto";
import UsersRepository from "../../repositories/users.repositories";

class CreateUserService {
  async execute(newUser: UserDto) {
    try {
      const userCreated = await UsersRepository.CreateUser(newUser);

      return !!userCreated;
    } catch (error) {
      throw error;
    }
  }
}

export default new CreateUserService();
