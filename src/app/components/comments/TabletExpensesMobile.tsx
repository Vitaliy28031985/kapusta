'use client'

import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import data from '../../../db/expenses.json';
import { BsFeather } from 'react-icons/bs';
import AddExpenseModule from './AddExpenseMobile';


const TabletExpensesMobile = () => {
    const [add, setAdd] = useState(false);
    const isShowAdd = () => setAdd(prev => !prev);

    return (
        <section>
        <div className='mt-24 h-[450px] overflow-y-auto scrollbar-bt_col'>
            {data.expenses.map(({ id, date, description, category, sum }) => (
              <div key={id} className="mx-5 flex justify-center items-center gap-5 mb-2 pb-2 border-2 border-t-transparent border-l-transparent border-r-transparent border-b-bg_fon">
            <div className='w-[127px]'>
                <p className='mb-1 text-sx text-text_color font-bold'>{description}</p>
                <div className='flex items-center gap-3'>
                    <p className='text-[8px] text-text_color font-normal'>{date}</p>
                    <p className='text-[8px] text-text_color font-normal'>{category}</p>
                </div>
            </div>
            <p className='w-[84px] text-[11px] font-bold text-red_color'>- {sum} UAH.</p>
            <div className='flex justify-center items-center'>
                <button className='flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full' type='button'><FaRegTrashCan className='size-[18px]'/></button>                   
                <button className='flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full' type='button'><BsFeather className='size-[18px]'/></button>
            </div>
        </div>
        ))}
       
            </div>
        <button
        onClick={isShowAdd}
        className="ml-3 mt-2 px-3 py-1 text-sx border-2 border-text_color text-text_color hover:border-text_op hover:text-text_op rounded-[16px]"
        type="button"
      >
        Add
        </button>
         {add && (<AddExpenseModule isShowAdd={isShowAdd}/>)}   
       </section>
    )
}

export default TabletExpensesMobile;