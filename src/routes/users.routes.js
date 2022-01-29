import { Router } from "express";

import { registerSchema } from "../models/register.yup";
import { loginSchema } from "../models/login.yup";

import { validateRequisition } from "../middlewares/validation.middleware";
import { authenticateUser } from "../middlewares/authentication.middlewares";
import { permissionForUpdatingPassword } from "../middlewares/authorization.middlewares";

import {
  registerUser,
  loginUser,
  listUsers,
  updateUser,
} from "../controllers/controllers.controllers";

const route = Router();

export const userRoutes = (app) => {
  route.post("/signup", validateRequisition(registerSchema), registerUser);
  route.post("/login", validateRequisition(loginSchema), loginUser);
  route.get("/users", authenticateUser, listUsers);
  route.put(
    "/users/:uuid/password",
    authenticateUser,
    permissionForUpdatingPassword,
    updateUser
  );

  app.use("", route);
};
