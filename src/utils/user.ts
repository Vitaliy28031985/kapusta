'use server'
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function getUserFromDb(email: string) {
   
    await connectToDatabase(); 

    const normalizedEmail = email.toLowerCase();

    return await User.findOne({ email: normalizedEmail });
}

export async function createUserIfNotExists(email: string, data: any) {
  const existing = await User.findOne({ email });
  if (!existing) {
    return await User.create(data);
  }
  return existing;
}