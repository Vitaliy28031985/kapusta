'use client'

import { useState, useRef, useEffect } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsFeather } from 'react-icons/bs';
import AddExpense from './AddExpense';
import { ExpensesProps } from '@/app/interfaces/comments';
import { formatDate, toInputDate } from '@/utils/date-convector';
import { useExpenseStore } from '@/store/expenses-store';
import { category as categoryDb } from '../../../db/categoryExpenses';
import { useAuthStore } from '@/store/auth.store';
import { updateExpense } from '@/actions/updateExpense';
import { deleteExpense } from '@/actions/deleteExpense';


const ExpensesTablet = ({ data, onToggle }: ExpensesProps) => {
  
const {
  addIsToggle,
  updateField,
  } = useExpenseStore();
  
  const { session } = useAuthStore();
      
  const userId = session?.user?.id;

  const [add, setAdd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const addRef = useRef<HTMLDivElement | null>(null);

  const isShowAdd = () => setAdd(prev => !prev);

  
  useEffect(() => {
    if (add && scrollContainerRef.current && addRef.current) {
         addRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [add]);


  
  const onDeleteToggle = (id: string, current: boolean) => {
    addIsToggle(id, !current, "delete");
  };

  
  const onUpdateToggle = (id: string, current: boolean) => {
    addIsToggle(id, !current, "update");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.id, e.target.name, e.target.value);
  };

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
          {data?.map(({ _id, date, description, category, sum, isShow, isDelete }) => (
            <div key={_id.toString()} className="flex items-center py-1 mx-[2px] mb-[2px] bg-white shadow-shadow_menu">
              {isShow ? (
                <>
                    <input
                      id={_id.toString()}
                      name="date"
                      type="date"
                      className="appearance-none tab:pl-3 desk:pl-5 tab:pr-1  desk:pr-3  py-1 text-text_op w-full tab:w-[116px] desk:w-[136px] focus:outline-none"
                      defaultValue={toInputDate(date.toString())}
                      onChange={onChange}
                    />
                    <input
                      id={_id.toString()}
                      name="description"
                      type="text"
                      className="w-full tab:w-[190px] desk:w-[191px] text-text_op focus:outline-none"
                      defaultValue={description}
                      onChange={onChange}
                    />
                      <select className="appearance-none  w-full  desk:pl-5 tab:w-[106px] desk:w-[149px] text-text_op focus:outline-none"  name="category" autoComplete="off" defaultValue="Select a category">
                               {
                               categoryDb.map(({ id, name }) => (
                                   <option key={id} value={name}>
                                       {name}
                                   </option> 
                               ))                
                               }        
                               </select>
                    <input
                      id={_id.toString()}
                      name="sum"
                      type="number"
                      className="tab:pl-2 desk:pl-3 w-full tab:w-[105px] desk:w-[105px] text-red_color focus:outline-none"
                      defaultValue={sum}
                      onChange={onChange}
                    />
                  </>
              ) : (
                <><div className="tab:w-[116px] desk:w-[136px] text-center text-sx text-text_op">{formatDate(date.toString())}</div>
              <div className="tab:w-[190px] desk:w-[221px] text-sx text-text_op">{description}</div>
              <div className="tab:w-[156px] desk:w-[179px] text-center text-sx text-text_op">{category}</div>
              <div className="tab:w-[105px] desk:w-[105px] text-center text-sx text-red_color">{`- ${sum} UAN.`}</div>
              </>)}
              
              <div className="flex justify-center items-center tab:w-[105px] desk:w-[105px] gap-2 py-1">
                <button onClick={async () => {
                  onDeleteToggle(_id.toString(), isDelete ?? false);
                  const resultDelete = await deleteExpense(_id.toString(), userId ?? '');
                   if (resultDelete.status !== 'error') {
                    console.log("successfully", resultDelete.message)
                    
                  } else {
                  console.log("Error", resultDelete.message);  
                   }
                 if(onToggle)
                 onToggle();
                }}
                  className="flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full" type="button">
                  <FaRegTrashCan className="size-[18px]" />
                </button>
                <button onClick={async () => {
                  onUpdateToggle(_id.toString(), isShow ?? false)
                  if (isShow) {
                  if (isShow && userId) {
                  const newExpense = {
                   id: _id.toString(),
                   date: new Date(date),
                   description,
                   category,
                   sum: Number(sum),
                   userId, 
                    };                   
                  const resultUpdate = await updateExpense(newExpense);
                  if (resultUpdate.status !== 'error') {
                    console.log("successfully", resultUpdate.message)
                    
                  } else {
                  console.log("Error", resultUpdate.message);  
                   }
                 if(onToggle)
                 onToggle();
                  }    
                  }
                  }} className="flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full" type="button">
                  <BsFeather className="size-[18px]" />
                </button>
              </div>
            </div>
          ))}

         
          {add && (
            <div ref={addRef}>
              <AddExpense isShowAdd={isShowAdd} onToggle={onToggle} />
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

 
