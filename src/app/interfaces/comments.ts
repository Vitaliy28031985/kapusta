import { ObjectId, Types } from "mongoose";
import { SummaryItem } from "./months";
import { Data } from "./filter";

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
  filterData?: Data;
  onToggle?: () => void;
  data?: IComment[];
  summary?: SummaryItem[];
}

