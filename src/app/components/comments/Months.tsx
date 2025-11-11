'use client'
import { SummaryItem } from "@/app/interfaces/months";

type MonthsProps = {
  summary: SummaryItem[];
};
// const summary = [
//     { id: 1, month: 'November', sum: 10000.00 },
//     { id: 2, month: 'October', sum: 30000.00 },
//     { id: 3, month: 'September', sum: 30000.00 },
//     { id: 4, month: 'August', sum: 20000.00 },
//     { id: 5, month: 'July', sum: 15000.00 },
//     { id: 6, month: 'June', sum: 18000.00 }
// ]


const Months = ({summary}: MonthsProps) => {
    return (
        <div className="tab:w-[230px] desk:w-[213px] h-[238px] tab:-ml-10 mt-[60px] bg-white">
          <div className="tab:w-[230px] desk:w-[213px] py-2 rounded-tl-[16px] rounded-tr-[16px] bg-bg_fon text-center text-sx font-bold">SUMMARY</div>  
            <ul>
                <li>
                 {summary.map(item => (
                <div className="flex items-center justify-between bg-bg_fon px-3 py-2 mt-[2px] last:rounded-br-[16px]" key={item.id}>
                <div className="text-text_color font-normal text-xs">{ item.month.toLocaleUpperCase()}</div>
                <div className="text-text_color font-normal text-xs">{item.sum}</div>        
                </div>  
                 ))}   
                </li>
            </ul>
            
            
        </div>
)
}

export default Months;