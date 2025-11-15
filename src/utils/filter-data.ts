import { IComment } from "@/app/interfaces/comments";
import { Data } from "@/app/interfaces/filter";



export const getFilterDataItems = (data: IComment[], filterData: Data): IComment[] => {

  return data.filter(({ date, description, category, sum }) => {
    
    // Перевірка дати
    const isSameDate = (date1: string | Date, date2: string | Date) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);

      return d1.getDate() === d2.getDate() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getFullYear() === d2.getFullYear();
    };

    const dateMatch = filterData.date
      ? isSameDate(date, filterData.date)
      : false;

    const descriptionMatch = filterData.description
      ? description.toLowerCase().includes(filterData.description.toLowerCase())
      : false;

    const categoryMatch = filterData.category
      ? category === filterData.category
      : false;

    const sumMatch = filterData.sum
      ? sum === Number(filterData.sum)
      : false;

   
    return dateMatch || descriptionMatch || categoryMatch || sumMatch;
  });
};


    



