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
    .string()
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
    res.status(403).json({ error: e.error.join(", ") });
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

app.listen(3000, () => {
  console.log("Running at port 'http://localhost:3000'");
});
