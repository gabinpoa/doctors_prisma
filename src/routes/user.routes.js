import { Router } from "express";
import { addYourselfController } from "../useCases/addYourself/addYourself.controller.js";
import {
  addYourselfSchema,
  validateAddYourself,
} from "../useCases/addYourself/validateAddYourself.js";
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
import { deleteSurgeryController } from "../useCases/deleteSurgery/deleteSurgery.controller.js";
import { homeController } from "../useCases/home/home.controller.js";
import { loginController } from "../useCases/login/login.controller.js";
import { loginSchema, validateLogin } from "../useCases/login/validateLogin.js";
import { readAllUsersController } from "../useCases/readAllUsers/readAllUsers.controller.js";
import { readUserController } from "../useCases/readUser/readUser.controller.js";
import { updateSurgeryController } from "../useCases/updateSurgery/updateSurgery.controller.js";
import {
  updateSurgerySchema,
  validateUpdateSurgery,
} from "../useCases/updateSurgery/validateUpdateSurgery.js";
import { validateIsAdmin } from "../utils/validateIsAdmin.js";
import { validateIsCreatorOrAbove } from "../utils/validateIsCreatorOrAbove.js";
import { validateToken } from "../utils/validateToken.js";

export const routes = Router();

routes.get("/user", validateToken, readUserController);
routes.get(
  "/users",
  validateToken,
  validateIsCreatorOrAbove,
  readAllUsersController
);
routes.post(
  "/user",
  validateToken,
  validateIsAdmin,
  validateCreateUser(createUserSchema),
  createUserController
);
routes.post("/login", validateLogin(loginSchema), loginController);

routes.post(
  "/surgery",
  validateToken,
  validateIsCreatorOrAbove,
  validateCreateSurgery(createSurgerySchema),
  createSurgeryController
);
routes.get("/home", validateToken, homeController);
routes.put(
  "/surgery/:id",
  validateToken,
  validateIsCreatorOrAbove,
  validateUpdateSurgery(updateSurgerySchema),
  updateSurgeryController
);
routes.patch(
  "/surgery/:id",
  validateToken,
  validateAddYourself(addYourselfSchema),
  addYourselfController
);
routes.delete(
  "/surgery/:id",
  validateToken,
  validateIsCreatorOrAbove,
  deleteSurgeryController
);
