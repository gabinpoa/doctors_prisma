import { Router } from "express";
import { createSurgeryController } from "../useCases/createSurgery/createSurgery.controller.js";
import {
  createSurgerySchema,
  validateCreateSurgery,
} from "../useCases/createSurgery/validateCreateSurgery.js";
import { createUserController } from "../useCases/createUser/createUser.controller.js";
import {
  createUserSchema,
  validateCreateUser,
} from "../useCases/createUser/validateCreateUser.js";
import { loginController } from "../useCases/login/login.controller.js";
import { loginSchema, validateLogin } from "../useCases/login/validateLogin.js";
import { readAllUsersController } from "../useCases/readAllUsers/readAllUsers.controller.js";
import { readUserController } from "../useCases/readUser/readUser.controller.js";
import { validateIsAdmin } from "../utils/validateIsAdmin.js";
import { validateIsCreatorOrAbove } from "../utils/validateIsCreatorOrAbove.js";
import { validateToken } from "../utils/validateToken.js";

export const routes = Router();

routes.get("/user", validateToken, readUserController);
routes.get("/users", validateToken, validateIsAdmin, readAllUsersController);
routes.post(
  "/users",
  validateToken,
  validateIsAdmin,
  validateCreateUser(createUserSchema),
  createUserController
);
routes.post("/login", validateLogin(loginSchema), loginController);

routes.post(
  "/surgeries",
  validateToken,
  validateIsCreatorOrAbove,
  validateCreateSurgery(createSurgerySchema),
  createSurgeryController
);
