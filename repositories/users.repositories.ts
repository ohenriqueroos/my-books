import { GetUserDto, UserDto } from "../dtos/users.dto";
import { User } from "../models/users.model";
import { v7 as uuid } from "uuid";

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
    const userCreated = new User({
      id: uuid(),
      ...newUser,
    });
    return (await userCreated.save()) as unknown as GetUserDto;
  }
  async UpdateUser(id: string, updatedUser: UserDto) {
    return await User.update({ id }, updatedUser);
  }
}

export default new UsersRepository();
