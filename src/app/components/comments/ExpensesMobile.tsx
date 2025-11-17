'use client'
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import FilterMobile from './FilterMobile';
import { Data, defaultData } from '@/app/interfaces/filter';
import TabletExpensesMobile from './TabletExpensesMobile';
import { category } from "@/db/categoryExpenses";
import { IComment } from '@/app/interfaces/comments';
import { getFilterDataItems } from '@/utils/filter-data';

interface Expenses {
    data: IComment[];
    showFilter: boolean;
    isShowFilter: () => void;
    onToggle: () => void;
    toggle: boolean;
}

const ExpensesMobile = ({data, onToggle, toggle, showFilter, isShowFilter }: Expenses) => {
   const [expensesData, setExpensesData] = useState<IComment[]>(data ?? []);
    const [filterData, setFilterData] = useState<Data>(defaultData);
  ;
    

    useEffect(() => {
            if (filterData.action) {
                setExpensesData(getFilterDataItems(data ?? [], filterData))
            } else {
                setExpensesData(data ?? [])
            }
        }, [filterData])
    
        const getFilterData = (data: Data) => {
            setFilterData(data);
            onToggle();
        }
    
     
    return (
        <div>
            <button onClick={isShowFilter} className='text-text_op hover:text-bt_col ml-5 mt-4' type='button'>{!toggle ? (<div className='flex items-center gap-2'>Filter <FaArrowRight className="size-6"/></div>) : (<FaArrowLeft className="size-6" />) } </button>
            
            {showFilter && (<FilterMobile category={category} filterData={getFilterData} />)}
            {!showFilter && (<TabletExpensesMobile   onToggle={onToggle} data={expensesData.length === 0 ? data : expensesData} />)}

        </div>
    )
}

export default ExpensesMobile;

