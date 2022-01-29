import jwt from "jsonwebtoken";

import { USERS } from "../config/database.config";
import { config } from "../config/jwt.config";
import { authenticating } from "../services/middlewares.services";

export const authenticateUser = (req, res, next) => {
  const token = authenticating(req, res);

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let authenticatedUser = USERS.find((user) => user.uuid === decoded.uuid);
    if (!authenticatedUser) {
      return res.status(401).json({ message: "No user found!" });
    }

    req.authenticatedUser = authenticatedUser;
  });

  return next();
};
