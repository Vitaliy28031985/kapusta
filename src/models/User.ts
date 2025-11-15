import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    },
  {
    timestamps: true,    
    versionKey: false,   
  }
);

export const User = models.User || model("User", UserSchema);


// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { User } from "@/models/User";

// export async function GET() {
//   await connectToDatabase();

//   const users = await User.find({});
//   return NextResponse.json(users);
// }

// export async function POST(request: Request) {
//   await connectToDatabase();
//   const body = await request.json();

//   const newUser = await User.create(body);
//   return NextResponse.json(newUser);
// }

