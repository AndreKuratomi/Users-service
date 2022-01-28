import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

app.post("/signup", validateRequisition(registerSchema), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      uuid: uuidv4(),
      username: req.body.username,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      createdOn: new Date(),
    };

    const { password: data_password, ...dataWithoutPassword } = newUser;

    USERS.push(newUser);

    return res.status(201).json(dataWithoutPassword);
  } catch (e) {
    res.json({ message: `Error while creating an user: ${e}` });
  }
});

app.post("/login", validateRequisition(loginSchema), async (req, res) => {
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
});

app.get("/users", authenticateUser, (req, res) => {
  const allUsers = USERS;
  return res.json(allUsers);
});

app.put(
  "/users/:uuid/password",
  authenticateUser,
  permissionForUpdatingPassword,
  async (req, res) => {
    const user = req.authorizedUser;

    const { newPassword } = req.body;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    return res.status(204).json({ message: "" });
  }
);
