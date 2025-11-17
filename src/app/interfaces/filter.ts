import { DataCategory } from "./report";

export interface Data {
  date: Date | null;
  description: string;
  category: string;
  sum: string;
  action: boolean;
}

export interface FilterProps { 
  filterData: (data: Data) => void;
  category: DataCategory[];
}

 export const defaultData = {
    date: new Date(),
    description: '',
    category: '',
   sum: '',
    action: false,
}