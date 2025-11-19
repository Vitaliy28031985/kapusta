'use server'

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Income } from "@/models/Income";

export const deleteIncome = async (id: string, userId: string) => {
    const _id = new mongoose.Types.ObjectId(id.toString()); 
   

    await connectToDatabase();

     const incomes = await Income.findById(_id);

   
    if (!incomes) {
    return { status: "error", message: "Income not found!" };
}

    if (incomes.owner.toString() !== userId) {
        return { status: "error", message: "You are not the owner of the income item!" };
    }

    try {

        await Income.findByIdAndDelete(_id);

        return { status: "success", message: "Income successfully deleted!" }; 
        
    } catch (error) {
        console.error("Error during deleting:", error);
        return { status: "error", message: "An error occurred during deleting!" };
    }
} 