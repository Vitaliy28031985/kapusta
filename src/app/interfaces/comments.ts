import { ObjectId } from "mongoose";

export interface IComment {
  _id: ObjectId | string;
  date: Date | string;        
  description: string;
  category: string;
  sum: number;
  owner: ObjectId | string;
  createdAt: Date | string;
  updatedAt: Date | string;
    
    isActions?: boolean;
    isShow?: boolean;
    isDelete?: boolean;
}

export interface ExpensesProps {
    data: IComment[];
}
