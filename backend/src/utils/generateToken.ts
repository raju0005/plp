import jwt from "jsonwebtoken";

export const generateToken = (id: string): String => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
