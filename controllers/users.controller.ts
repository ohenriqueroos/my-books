import { Request, Response } from "express";
import UsersService from "../services/users-services/get-users.service";
import CreateUserService from "../services/users-services/create-user.service";

class UsersController {
  async getUsers(req: Request, res: Response) {
    const users = await UsersService.execute();

    if (users) {
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    }

    return res.status(500).json({ message: "Failed to retrieve users" });
  }

  async createUser(req: Request, res: Response) {
    console.log(req.body);

    try {
      const { username, name, email, birthDate } = req.body;

      const userCreated = await CreateUserService.execute({
        username,
        name,
        email,
        birthDate: new Date(birthDate),
      });

      if (userCreated) {
        return res.status(201).json({ message: "User created successfully" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      console.log("Mensagem", error.message);
      return res.status(500).json({ message: "Failed to create user" });
    }
  }
}

export default new UsersController();
