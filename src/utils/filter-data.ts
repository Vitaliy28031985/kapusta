import { IComment } from "@/app/interfaces/comments";
import { Data } from "@/app/interfaces/filter";



export const getFilterDataItems = (data: IComment[], filterData: Data): IComment[] => {
  
 
  
  const filteredDescription = 
  filterData.description === ''
    ? data
    : data?.filter(item =>
        item.description
          .toLowerCase()
          .includes(filterData.description.toLowerCase())
      ) ?? [];
    
      
    
const filteredCategory = filterData.category === '' ? filteredDescription :  filteredDescription?.filter(item =>
      item.category.toLowerCase().includes(filterData.category.toLowerCase())) ?? [];
    
const filterSum = Number(filterData.sum) === 0 ?  filteredCategory :  filteredCategory?.filter(item => item.sum === Number(filterData.sum)) ?? []
   

  const isSameDate = (date1: string | Date, date2: string | Date) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getDate() === d2.getDate() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getFullYear() === d2.getFullYear();
  };


 const filteredDate =
  !filterData.date
    ? filterSum
    : filterSum?.filter(item =>
        filterData.date !== null &&
        isSameDate(item.date, filterData.date)
      ) ?? [];

  
  return filteredDate;


  
 }


