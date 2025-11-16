'use server'

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";


export const updateExpense = async (dto:
    { id: string; date: Date; description: string, category: string, sum: number, userId: string }) => {
  
   
    const _id = new mongoose.Types.ObjectId(dto.id.toString());
    const date = dto.date ? new Date(dto.date) : null;
    if (!date || isNaN(date.getTime())) {
    return { status: "error", message: "Invalid date provided!" };
  
}

    const updatedData = {
        date,
        description: dto.description,
        category: dto.category,
        sum: dto.sum
    }


    await connectToDatabase();

    const expense = await Expense.findById(_id);

   
    if (!expense) {
    return { status: "error", message: "Expense not found!" };
}

    if (expense.owner.toString() !== dto.userId) {
        return { status: "error", message: "You are not the owner of the expense item!" };
    }

    try {
    
        await Expense.findByIdAndUpdate(_id, updatedData, { new: true }); 
    
        return { status: "success", message: "Expense successfully updated!" }; 
        
    }catch (error) {
        console.error("Error during updating:", error);
        return { status: "error", message: "An error occurred during updating!" };
  }
    


}