import { UserDto } from "../dtos/users.dto";
import { User } from "../models/users.model";

class UsersRepository {
  async GetAll() {
    return await User.scan().exec();
  }
  async GetById(id: string) {
    return await User.get(id);
  }
  async DeleteUser(id: string) {
    return await User.delete(id);
  }
  async CreateUser(newUser: UserDto) {
    return await User.create(newUser);
  }
  async UpdateUser(id: string, updatedUser: UserDto) {
    return await User.update({ id }, updatedUser);
  }
}

export default new UsersRepository();
