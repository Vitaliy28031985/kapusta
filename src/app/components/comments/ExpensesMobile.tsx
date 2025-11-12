'use client'
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import FilterMobile from './FilterMobile';
import { Data, defaultData } from '@/app/interfaces/filter';
import TabletExpensesMobile from './TabletExpensesMobile';
import { category } from "@/db/categoryExpenses";

interface Expenses {
    onToggle: () => void;
    toggle: boolean;
}

const ExpensesMobile = ({onToggle, toggle}: Expenses) => {
    // const [toggle, setToggle] = useState(false);
        const [filterData, setFilterData] = useState<Data>(defaultData);
    
        const getFilterData = (data: Data) => {
            setFilterData(data);
        }
    
        console.log(filterData)

    // const onToggle = () => setToggle(toggle => !toggle);
    return (
        <div>
            <button onClick={onToggle} className='text-text_op hover:text-bt_col ml-5 mt-4' type='button'>{!toggle ? (<div className='flex items-center gap-2'>Filter <FaArrowRight className="size-6"/></div>) : (<FaArrowLeft className="size-6" />) } </button>
            
            {toggle && (<FilterMobile category={category} filterData={getFilterData} />)}
            {!toggle && (<TabletExpensesMobile/>)}

        </div>
    )
}

export default ExpensesMobile;

