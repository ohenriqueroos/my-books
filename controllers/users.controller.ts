import { Request, Response } from "express";
import UsersService from "../services/users-services/get-users.service";
import CreateUserService from "../services/users-services/create-user.service";
import DeleteUserService from "../services/users-services/delete-user.service";

class UsersController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UsersService.execute();

      if (users) {
        if (users.length === 0) {
          return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      return res.status(500).json({ message: "Failed to retrieve users" });
    }
  }

  async createUser(req: Request, res: Response) {
    console.log(req.body);

    try {
      const { username, name, email, birthDate, password } = req.body;

      const userCreated = await CreateUserService.execute({
        username,
        name,
        email,
        birthDate: new Date(birthDate),
        password,
      });

      return res.status(201).json(userCreated);
    } catch (error) {
      console.error("Error creating user:", error);
      console.log("Mensagem", error.message);
      return res.status(500).json({ message: "Failed to create user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await DeleteUserService.execute(id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Failed to delete user" });
    }
  }
}

export default new UsersController();
