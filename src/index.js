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
    console.log(e.errors.join(", "));
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

    let user = USERS.find((user) => user.username === decoded.username);

    req.user = user;
    // não entendi exatamente o que a linha acima faz
  });

  return next();
};

const updatePassword = (schema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: e.error.join(", ") });
  }
};

// ==================ROUTES====================
const USERS = [];

app.post("/signup", validateRequisition(registerSchema), async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // // console.log(hashedPassword);

    const newUser = {
      uuid: uuidv4(),
      username: req.body.username,
      age: req.body.age,
      email: req.body.email,
      // password: hashedPassword,
      password: req.body.password,
      createdOn: new Date(),
    };

    const { password: data_password, ...dataWithoutPassword } = newUser;

    USERS.push(newUser);

    return res.status(201).json(dataWithoutPassword);
  } catch (e) {
    res.json({ message: "Error while creating an user" });
  }
});

app.post("/login", validateRequisition(loginSchema), (req, res) => {
  let { username, password } = req.body;

  let wrightUser = USERS.find((user) => user.username === username);

  if (!wrightUser) {
    return res.status(401).json({ message: "User not found!" });
  } else if (wrightUser.password !== password) {
    return res.status(401).json({ message: "User and password missmatch!" });
  }

  let token = jwt.sign({ username: username }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.json({ token });
});

app.get("/users", authenticateUser, (req, res) => {
  const allUsers = USERS;
  return res.json(allUsers);
});

app.listen(3000, () => {
  console.log("Running at port 'http://localhost:3000'");
});
