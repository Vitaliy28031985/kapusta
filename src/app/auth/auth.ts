
import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import { signInSchema } from "@/app/schema/zod"
import { createUserIfNotExists, getUserFromDb } from "@/utils/user"

import { connectToDatabase } from "@/lib/mongodb";




 
export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

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
                console.error("error:", err);
               return null;
             }
           },
    }),
    ],
  
  callbacks: {
    
    async signIn({ user, account }) {
  try {
    if (account?.provider === "google") {
      await connectToDatabase();
      await createUserIfNotExists(user.email!, {
      email: user.email!,
      userName: user.name || user.email!.split("@")[0],
      password: "", 
      provider: "google",
    });

    }
    return true;
  } catch (err) {
    console.error("Google sign-in error:", err);
    return false; 
  }
},

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