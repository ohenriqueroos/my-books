import { UserDto } from "../../dtos/users.dto";
import UsersRepository from "../../repositories/users.repositories";
import crypto from "node:crypto";

class CreateUserService {
  async execute(newUser: UserDto) {
    try {
      const minimumPasswordLength = newUser.password.length >= 8;
      const hasCapitalLetter = /[A-Z]/.test(newUser.password);
      const hasLowercaseLetter = /[a-z]/.test(newUser.password);
      const hasNumber = /\d/.test(newUser.password);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(
        newUser.password
      );

      if (
        !minimumPasswordLength ||
        !hasCapitalLetter ||
        !hasLowercaseLetter ||
        !hasNumber ||
        !hasSpecialCharacter
      ) {
        throw new Error(
          "Password must be at least 8 characters long and include at least one capital letter, one lowercase letter, one number, and one special character."
        );
      }

      const salt = crypto.randomBytes(16).toString("hex");

      const passwordHash = crypto
        .scryptSync(newUser.password, salt, 64)
        .toString("hex");

      const user = { ...newUser, password: passwordHash };

      const userCreated = await UsersRepository.CreateUser(user);

      return { user: userCreated };
    } catch (error) {
      throw error;
    }
  }
}

export default new CreateUserService();
