'use server'

import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { saltAndHahsPassword } from "@/utils/password";

const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const checkPassword = /^(?=.*[a-zA-Z])(?=.*[*!#&])[A-Za-z0-9*!#&]{6,}$/;

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

    if (!checkEmail.test(data.email)) {
      return { status: "error", message: "Invalid email format!" };
    }

    if (!checkPassword.test(data.password)) {
      return {
        status: "error",
        message:
          "Password must be at least 6 characters long and include letters and one of the symbols *!#&"
      };
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
