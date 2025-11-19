'use server'
import { connectToDatabase } from "@/lib/mongodb";
import { Income } from "@/models/Income";
import mongoose, { Types } from "mongoose";
import { Data } from "../interfaces/filter";
import { getFilterDataItems } from "@/utils/filter-data";
import { IComment } from "../interfaces/comments";

export const getIncomesData = async (id: string, filter: Data) => {
    
  await connectToDatabase();
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    return { status: "error", message: "Invalid user id!" };
}

    const owner = new mongoose.Types.ObjectId(id);
      try {
        const data = await Income.find({ owner }).lean();

       const normalizedData: IComment[] = (data as Array<Partial<IComment> & { _id: Types.ObjectId | string }>).map(item => ({
    _id: typeof item._id === 'string' ? item._id : item._id.toString(), // якщо ObjectId, перетворюємо на string
    date: item.date!,
    description: item.description!,
    category: item.category!,
    sum: item.sum!,
    owner: item.owner!,
    createdAt: item.createdAt!,
    updatedAt: item.updatedAt!,
   
}));

        
        if (filter?.action) {
          const filterData = getFilterDataItems(normalizedData, filter)
          return { status: "success", message: "Data received successfully!",  data: filterData};
        } else {
         return { status: "success", message: "Data received successfully!",  data}; 
        }
            
      } catch (error) {
      console.error("Error during register:", error);
      return { status: "error", message: "An error occurred while retrieving!" };
    }
} 