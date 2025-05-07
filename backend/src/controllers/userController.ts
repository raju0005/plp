import User from "../models/userModel";
import { Response, Request } from "express";
import { generateToken } from "../utils/generateToken";

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User  Already Exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User  Registered Successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not Found" });
    if (!(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid Password" });
    const token = generateToken(user.id.toString());
    const { password: _, ...userData } = user.toObject();
    return res
      .status(201)
      .header("Authorization", `Bearer ${token}`)
      .json({ message: "Logged In succesfully", user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};

export { registerUser, loginUser };
