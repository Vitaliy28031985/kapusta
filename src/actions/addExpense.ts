'use server'

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";

import { parseDate } from "@/utils/date-convector";

export const addExpense = async (formData: FormData) => {
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

    await Expense.create(newData);
     return { status: "success", message: "Expense successfully created!" };

    } catch (error) {
    console.error("Error during register:", error);
    return { status: "error", message: "An error occurred during creating!" };
  }
}

