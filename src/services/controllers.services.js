import * as bcrypt from "bcryptjs";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

export const hashing = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    uuid: uuidv4(),
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    password: hashedPassword,
    createdOn: new Date(),
  };

  return newUser;
};
