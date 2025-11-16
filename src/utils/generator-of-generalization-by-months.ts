import { IComment } from "@/app/interfaces/comments";

export function generatorOfGeneralizationByMonths(data: IComment[]) {
    const sortedData: IComment[] = []
    const months: string[] = []
    let sortMonths: string[] = []
    const summary: { id: number; month: string; sum: number }[] = []

    const today = new Date();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();
    const last6Months: { month: string; year: number }[] = [];

     const monthOrder = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
       
      for (let i = 0; i < 6; i++) {
        const date = new Date(currentYear, currentMonth - i, 1);
        last6Months.push({
            month: monthOrder[date.getMonth()],
            year: date.getFullYear(),
        });
    }

      data.map((item) => {
        const dateObj = new Date(item.date);
        if (isNaN(dateObj.getTime())) return false;

        const monthName = monthOrder[dateObj.getMonth()];
         const year = dateObj.getFullYear();

          const isEmptyMonthAndYear = last6Months.some(item => item.month === monthName && item.year === year);
          if (isEmptyMonthAndYear) {
              sortedData.push(item);
              const isEmptyMonth = months.filter((item) => item === monthName);
              if (isEmptyMonth.length === 0) {
                  months.push(monthName)
              }
         }

    });


    const sortedMonths = months.sort(
         (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
     );
    sortMonths = sortedMonths;
    

    sortMonths.forEach((itemMonth, index) => {
    const totalSum = sortedData.reduce((acc, item) => {
        const dateObj = new Date(item.date);
        if (isNaN(dateObj.getTime())) return acc;

        const monthName = monthOrder[dateObj.getMonth()];

        if (monthName === itemMonth) {
            return acc + item.sum;
        }

        return acc;
    }, 0);

        summary.push({
        id: index += 1, 
        month: itemMonth,
        sum: totalSum
    });
});
    return summary;

    
}