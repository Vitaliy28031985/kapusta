'use client'
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import FilterMobile from './FilterMobile';
import { Data, defaultData } from '@/app/interfaces/filter';
import TabletIncomeMobile from './TabletIncomeMobile';
import { category } from "@/db/categoryIncome";


interface Incomes {
     showFilter: boolean;
    isShowFilter: () => void;
    onToggle: () => void;
    toggle: boolean;
}

const IncomeMobile = ({onToggle, toggle, showFilter, isShowFilter}: Incomes) => {
    
        const [filterData, setFilterData] = useState<Data>(defaultData);
    
        const getFilterData = (data: Data) => {
            setFilterData(data);
        }
    

    return (
        <div>
            <button onClick={onToggle} className='text-text_op hover:text-bt_col ml-5 mt-4' type='button'>{!toggle ? (<div className='flex items-center gap-2'>Filter <FaArrowRight className="size-6"/></div>) : (<FaArrowLeft className="size-6" />) } </button>
            
            {showFilter && (<FilterMobile category={category} filterData={getFilterData} isShowFilter={isShowFilter} />)}
            {!showFilter && (<TabletIncomeMobile filterData={filterData}  onToggle={onToggle}/>)}

        </div>
    )
}

export default IncomeMobile;