import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;


if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in .env.local");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
