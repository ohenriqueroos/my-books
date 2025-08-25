import { Request, Response } from "express";
import UsersService from "../services/users-services/get-users.service";

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
}

export default new UsersController();
