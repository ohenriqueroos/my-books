import express from "express";
import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/", usersController.getUsers);

export default router;
