import express from "express";
import * as yup from "yup";
import * as bcrypt from "bcryptjs";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

const app = express();
app.use(express.json());

// ==================YUPS====================
const registerSchema = yup.object().shape({
  id: yup
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
const validateRegister = (schema) => async (req, res, next) => {
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

const authenticateUser = (schema) => async (req, res, next) => {
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

app.post("/signup", validateRegister(registerSchema), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password);
    // console.log(hashedPassword);
    const newUser = {
      id: uuidv4(),
      username: req.body.username,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      createdOn: new Date(),
    };
    USERS.push(newUser);

    const { password: data_password, ...dataWithoutPassword } = newUser;

    console.log(newUser);
    return res.status(201).json(dataWithoutPassword);
    // return res.status(201).json(newUser);
  } catch (e) {
    // console.log(req.body.password);
    // const hashedPassword = bcrypt.hash(req.body.password, 10);
    // console.log(hashedPassword);
    res.json({ message: "Error while creating an user" });
  }
});

app.listen(3000, () => {
  console.log("Running at port 'http://localhost:3000'");
});
