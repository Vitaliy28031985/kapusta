'use server';
import { signIn } from "@/app/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        return result;
    } catch (error) {
        console.error("error authorization", error);
        return { status: "error", message: "An error occurred during login!" };
    }
}