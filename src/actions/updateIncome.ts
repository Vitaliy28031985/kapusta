'use server'

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Income } from "@/models/Income";


export const updateIncome = async (dto:
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

    const income = await Income.findById(_id);

   
    if (!income) {
    return { status: "error", message: "Income not found!" };
}

    if (income.owner.toString() !== dto.userId) {
        return { status: "error", message: "You are not the owner of the income item!" };
    }

    try {
    
        await Income.findByIdAndUpdate(_id, updatedData, { new: true }); 
    
        return { status: "success", message: "Income successfully updated!" }; 
        
    } catch (error) {
        console.error("Error during updating:", error);
        return { status: "error", message: "An error occurred during updating!" };
    }
    


}