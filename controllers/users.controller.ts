import { Request, Response } from "express";

class UsersController {
  async getUsers(req: Request, res: Response) {
    res.status(200).json({ message: "Get Users" });
  }
}

export default new UsersController();
