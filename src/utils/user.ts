'use server'
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

type UserData = Partial<{
  userName: string;
  email: string;
  password?: string;
  provider?: string;
}>;

export async function getUserFromDb(email: string) {
   
    await connectToDatabase(); 

    const normalizedEmail = email.toLowerCase();

    return await User.findOne({ email: normalizedEmail });
}

export async function createUserIfNotExists(email: string, data: UserData) {
  const existing = await User.findOne({ email });
  if (!existing) {
    return await User.create(data);
  }
  return existing;
}