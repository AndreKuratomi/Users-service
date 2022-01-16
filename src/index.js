import express from "express";
import * as yup from "yup";
import * as bcrypt from "bcryptjs";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Running at port 'http://localhost:3000'");
});
