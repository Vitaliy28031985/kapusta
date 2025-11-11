export interface Data {
  date: Date;
  description: string;
  category: string;
  sum: string;
}

export interface FilterProps { 
  filterData: (data: Data) => void
}

 export const defaultData = {
    date: new Date(),
    description: '',
    category: '',
    sum: ''
}