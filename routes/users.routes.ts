import express from "express";
import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/", usersController.createUser);

export default router;
