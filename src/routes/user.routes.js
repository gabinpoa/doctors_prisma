import { Router } from "express";
import { createUserController } from "../useCases/createUser/createUser.controller.js";
import {
  createUserSchema,
  validateCreateUser,
} from "../useCases/createUser/validateCreateUser.js";
import { loginController } from "../useCases/login/login.controller.js";
import { loginSchema, validateLogin } from "../useCases/login/validateLogin.js";

export const routes = Router();

routes.post(
  "/users",
  validateCreateUser(createUserSchema),
  createUserController
);
routes.post("/login", validateLogin(loginSchema), loginController);
