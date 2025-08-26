import { GetUserDto } from "../../dtos/users.dto";
import UsersRepository from "../../repositories/users.repositories";

class GetUsersService {
  async execute() {
    try {
      const users = await UsersRepository.GetAll();

      const usersDto: GetUserDto[] = users.map((user) => ({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
      }));

      return usersDto;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export default new GetUsersService();
