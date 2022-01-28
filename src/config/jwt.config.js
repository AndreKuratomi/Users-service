import dotenv from "dotenv";

dotenv.config();

export const config = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
