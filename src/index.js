import express from "express";
import * as yup from "yup";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as bcrypt from "bcryptjs";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

const app = express();
app.use(express.json());
dotenv.config();

const config = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

// ==================YUPS====================
const registerSchema = yup.object().shape({
  uuid: yup
    .string()
    .notRequired()
    .default(function () {
      return uuidv4();
    }),
  username: yup.string().required(),
  age: yup.number().positive().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  createdOn: yup
    .date()
    .notRequired()
    .default(function () {
      return new Date();
    }),
});

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

// ==================MIDDLEWARES====================
const validateRequisition = (schema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    // console.log(e.errors.join(", "));
    res.status(422).json({ error: e.errors.join(", ") });
    // como exibir todos os erros feitos?
  }
};

const authenticateUser = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (!token) {
      return res.status(401).json({ message: "No token used!" });
    }
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let authenticatedUser = USERS.find(
      (user) => user.username === decoded.username
    );

    req.authenticatedUser = authenticatedUser;
  });

  return next();
};

const permissionForUpdatingPassword = (req, res, next) => {
  const { uuid } = req.params;

  let authorizedUser = USERS.find((user) => (user.uuid = uuid));

  if (!authorizedUser) {
    return res.status(401).json({ message: "No user found!" });
  }

  req.authorizedUser = authorizedUser;

  return next();
};

// ==================ROUTES====================
const USERS = [];

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
    console.log(e);
    res.json({ message: "Error while creating an user" });
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
  permissionForUpdatingPassword,
  authenticateUser,
  (req, res) => {
    const auth = req.authenticatedUser;
    const user = req.authorizedUser;
    console.log(auth.uuid);
    console.log(user.uuid);

    if (auth.uuid !== user.uuid) {
      return res
        .status(403)
        .json({ message: "Request only permited for the uuid's owner!" });
    }

    const { newPassword } = req.body;
    user.password = newPassword;
    return res.status(204).json({ message: "" });
  }
);

app.listen(3000, () => {
  console.log("Running at port 'http://localhost:3000'");
});
