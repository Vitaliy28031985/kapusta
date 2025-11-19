'use client'

import { Data, defaultData } from "@/app/interfaces/filter";
import { useState } from "react";
import Filter from "./Filter";
import IncomesTablet from "./IncomeTablet";
import { SummaryItem } from '@/app/interfaces/months';
import Months from "./Months";
import { category } from "@/db/categoryIncome";
import { ExpensesProps } from "@/app/interfaces/comments";

const summary: SummaryItem[] = [
    { id: 1, month: 'November', sum: 25500.00 },
    { id: 2, month: 'October', sum: 25500.00 },
    { id: 3, month: 'September', sum: 25500.00 },
    { id: 4, month: 'August', sum: 20000.00 },
    { id: 5, month: 'July', sum: 20000.00 },
    { id: 6, month: 'June', sum: 18000.00 }
]


const Income = ({ data, onToggle}: ExpensesProps) => {
      const [filterData, setFilterData] = useState<Data>(defaultData);
    
    const getFilterData = (data: Data) => {
        setFilterData(data);
    }
    
    
    return (
        <div className="z-50 tab:w-[704px] desk:w-[1098px] tab:h-[616px] desk:h-[579px] tab:pt-6 desk:pt-8 tab:pb-[42px] desk:pb-[61px] tab:px-10 desk:px-8  bg-white relative tab:left-[32px]  desk:left-[91px] rounded-r-[16px] rounded-bl-[16px] shadow-shadow">
            <Filter category={category} filterData={getFilterData} />
            <div className="desk:flex items-start gap-[75px]">
                <IncomesTablet filterData={filterData} data={data} onToggle={onToggle} />
                <Months summary={summary}/>
            </div>
        </div>)
}

export default Income;