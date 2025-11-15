'use server'

import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { saltAndHahsPassword } from "@/utils/password";

export const register = async (data: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    await connectToDatabase();

    const normalizedEmail = data.email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return { status: "error", message: "Such user already exists!" };
    }

    const hashedPassword = await saltAndHahsPassword(data.password);

    const newUser = {
      userName: data.userName,
      email: normalizedEmail,
      password: hashedPassword
    };

    await User.create(newUser);

    return { status: "success", message: "User successfully registered!" };
  } catch (error) {
    console.error("Error during register:", error);
    return { status: "error", message: "An error occurred during registration!" };
  }
};
