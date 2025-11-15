import bcryptjs from "bcryptjs";


export async function saltAndHahsPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcryptjs.hash(password, saltRounds);
}