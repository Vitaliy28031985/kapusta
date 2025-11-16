'use server'

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";

export const deleteExpense = async (id: string, userId: string) => {
    const _id = new mongoose.Types.ObjectId(id.toString()); 
   

    await connectToDatabase();

     const expense = await Expense.findById(_id);

   
    if (!expense) {
    return { status: "error", message: "Expense not found!" };
}

    if (expense.owner.toString() !== userId) {
        return { status: "error", message: "You are not the owner of the expense item!" };
    }

    try {

        await Expense.findByIdAndDelete(_id);

        return { status: "success", message: "Expense successfully deleted!" }; 
        
    } catch (error) {
        console.error("Error during deleting:", error);
        return { status: "error", message: "An error occurred during deleting!" };
    }
} 