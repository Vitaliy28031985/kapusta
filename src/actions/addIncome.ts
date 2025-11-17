'use server'
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Income } from "@/models/Income";

import { parseDate } from "@/utils/date-convector";

export const addIncome = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    
    const date = parseDate(data.date.toString());
    const id = new mongoose.Types.ObjectId(data.id.toString());

    const newData = {
        date,
        description: data.description.toString(),
        category: data.category.toString(),
        sum: Number(data.sum),
        owner: id,
    }

    await connectToDatabase();

     try {
    
        await Income.create(newData);
         return { status: "success", message: "Income successfully created!" };
    
        } catch (error) {
        console.error("Error during Income:", error);
        return { status: "error", message: "An error occurred during creating!" };
      }
    
}