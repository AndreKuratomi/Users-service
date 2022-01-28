import * as yup from "yup";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from "uuid";

export const registerSchema = yup.object().shape({
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
