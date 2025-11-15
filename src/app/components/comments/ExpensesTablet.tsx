'use client'

import { useState, useRef, useEffect } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsFeather } from 'react-icons/bs';
import AddExpense from './AddExpense';
import { ExpensesProps } from '@/app/interfaces/comments';
import { formatDate } from '@/utils/date-convector';

const ExpensesTablet = ({data}: ExpensesProps) => {
  const [add, setAdd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const addRef = useRef<HTMLDivElement | null>(null);

  const isShowAdd = () => setAdd(prev => !prev);

  
  useEffect(() => {
    if (add && scrollContainerRef.current && addRef.current) {
         addRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [add]);

  return (
    <section className='z-40 relative'>
      <div className="tab:w-[624px] desk:w-[746px] max-h-[416px] mt-16 bg-bg_fon rounded-tl-[16px] rounded-tr-[16px]">
        <div className="flex items-center py-1">
          <div className="tab:w-[116px] desk:w-[136px] text-center text-sx font-bold">DATE</div>
          <div className="tab:w-[190px] desk:w-[221px] text-sx font-bold">DESCRIPTION</div>
          <div className="tab:w-[156px] desk:w-[179px] text-center text-sx font-bold">CATEGORY</div>
          <div className="tab:w-[105px] desk:w-[105px] text-center text-sx font-bold">SUM</div>
          <div className="tab:w-[105px] desk:w-[105px]"></div>
        </div>

     
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto max-h-[300px] scrollbar-bt_col"
        >
          {data?.map(({ _id, date, description, category, sum }) => (
            <div key={_id.toString()} className="flex items-center py-1 mx-[2px] mb-[2px] bg-white shadow-shadow_menu">
              <div className="tab:w-[116px] desk:w-[136px] text-center text-sx text-text_op">{formatDate(date.toString())}</div>
              <div className="tab:w-[190px] desk:w-[221px] text-sx text-text_op">{description}</div>
              <div className="tab:w-[156px] desk:w-[179px] text-center text-sx text-text_op">{category}</div>
              <div className="tab:w-[105px] desk:w-[105px] text-center text-sx text-red_color">{`- ${sum} UAN.`}</div>
              <div className="flex justify-center items-center tab:w-[105px] desk:w-[105px] gap-2 py-1">
                <button className="flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full" type="button">
                  <FaRegTrashCan className="size-[18px]" />
                </button>
                <button className="flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full" type="button">
                  <BsFeather className="size-[18px]" />
                </button>
              </div>
            </div>
          ))}

         
          {add && (
            <div ref={addRef}>
              <AddExpense isShowAdd={isShowAdd} />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={isShowAdd}
        className="mt-2 px-3 py-2 border-2 border-text_color text-text_color hover:border-text_op hover:text-text_op rounded-[16px]"
        type="button"
      >
        Add
      </button>
    </section>
  );
};

export default ExpensesTablet;


