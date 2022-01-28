import jwt from "jsonwebtoken";

import { USERS } from "../config/database.config";

export const authenticateUser = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ message: "Headers unabled!" });
  }

  let token = req.headers.authorization.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({ message: "No token used!" });
  }

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
