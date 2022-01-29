import express from "express";

import { userRoutes } from "./users.routes";

export const routes = (app) => {
  app.use(express.json());
  userRoutes(app);
};
