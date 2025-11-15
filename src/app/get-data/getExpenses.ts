'use server'
import { connectToDatabase } from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import mongoose from "mongoose";

export const getExpensesData = async (id: string) => {
    
  await connectToDatabase();
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    return { status: "error", message: "Invalid user id!" };
}

    const owner = new mongoose.Types.ObjectId(id);
      try {
  
         const data =   await Expense.find({owner}).lean();;
          
       return { status: "success", message: "Data received successfully!",  data};
  
      } catch (error) {
      console.error("Error during register:", error);
      return { status: "error", message: "An error occurred while retrieving!" };
    }
} 