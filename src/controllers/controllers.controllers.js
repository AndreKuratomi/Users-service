import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { USERS } from "../config/database.config";
import { config } from "../config/jwt.config";
import { hashing } from "../services/controllers.services";

export const registerUser = async (req, res) => {
  try {
    const newUser = await hashing(req);
    const { password: data_password, ...dataWithoutPassword } = newUser;

    USERS.push(newUser);

    return res.status(201).json(dataWithoutPassword);
  } catch (e) {
    res.json({ message: `Error while creating an user: ${e}` });
  }
};

export const loginUser = async (req, res) => {
  let { username, password } = req.body;

  let wrightUser = await USERS.find((user) => user.username === username);

  if (!wrightUser) {
    return res.status(401).json({ message: "User not found!" });
  }

  try {
    const match = await bcrypt.compare(password, wrightUser.password);
    let token = jwt.sign(
      { username: username, uuid: wrightUser.uuid },
      config.secret,
      {
        expiresIn: config.expiresIn,
      }
    );
    if (match) {
      return res.json({ accessToken: token });
    } else {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (e) {
    console.log(e);
  }
};

export const listUsers = (req, res) => {
  const allUsers = USERS;
  return res.json(allUsers);
};

export const updateUser = async (req, res) => {
  const user = req.authorizedUser;

  const { newPassword } = req.body;
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;

  return res.status(204).json({ message: "" });
};
