
import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/app/schema/zod"
import { getUserFromDb } from "@/utils/user"

import { connectToDatabase } from "@/lib/mongodb";



 
export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
    
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
             try {
               if (!credentials?.email || !credentials?.password) return null;
     
               const { email, password } = await signInSchema.parseAsync(credentials);
     
               await connectToDatabase();
               const user = await getUserFromDb(email);
     
               if (!user || !user.password) return null;
     
               const isPasswordValid = await bcrypt.compare(password, user.password);
               if (!isPasswordValid) return null;
     
               return {
                 id: user._id.toString(),
                 email: user.email,
                 emailVerified: null,
               };
             } catch (err) {
               return null;
             }
           },
    }),
    ],
  
    callbacks: {
     async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
   
    }
    return token;
  },
async session({ session, token }) {
  if (!token.id || !token.email || typeof token.id !== "string") {
    throw new Error("Invalid credentials");
  }

  session.user = {
    id: token.id,
    email: token.email,
    emailVerified: null, 
  };
  return session;
}
},
session: {
  strategy: "jwt", 
  maxAge: 3600
  },

  secret: process.env.AUTH_SECRET,

})