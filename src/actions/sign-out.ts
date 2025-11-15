'use server';
import { signOut } from "@/app/auth/auth";

export async function signOutFunc() {
        try {
            const result = await signOut({redirect: false});
            return result;
        } catch (error) {
            console.error("error authorization", error);
            throw error;
        }
}