'use client'

import { useState } from "react";
import Filter from "./Filter";
import { Data, defaultData } from "@/app/interfaces/filter";
import ExpensesTablet from "./ExpensesTablet";
import Months from "./Months";
import { category } from "@/db/categoryExpenses";
import { ExpensesProps} from "@/app/interfaces/comments";







const Expenses = ({ onToggle, summary }: ExpensesProps) => {
 

   
    const [filterData, setFilterData] = useState<Data>(defaultData);


    const getFilterData = (data: Data) => {
        setFilterData(data);
    }
   
  
    
    return (
        <div className="z-50 tab:w-[704px] desk:w-[1098px] tab:h-[616px] desk:h-[579px] tab:pt-6 desk:pt-8 tab:pb-[42px] desk:pb-[61px] tab:px-10 desk:px-8  bg-white relative tab:left-[32px]  desk:left-[91px] rounded-r-[16px] rounded-bl-[16px] shadow-shadow">
            <Filter category={category} filterData={getFilterData} />
            <div className="desk:flex items-start gap-[75px]">
                <ExpensesTablet filterData={filterData} onToggle={onToggle}/>
                <Months summary={summary ?? []} />   
            </div>
            
        </div>
    )
}

export default Expenses;

