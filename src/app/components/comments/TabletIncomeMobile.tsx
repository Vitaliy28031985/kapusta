'use client'

import { useEffect, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsFeather } from 'react-icons/bs';
import { category as categoryDb } from '../../../db/categoryIncome';
import AddIncomeModule from './AddIncomeMobile';
import { ExpensesProps } from '@/app/interfaces/comments';
import { useIncomeStore } from '@/store/incomes-store';
import { useAuthStore } from '@/store/auth.store';
import { formatDate, toInputDate } from '@/utils/date-convector';
import { deleteIncome } from '@/actions/deleteIncome';
import { updateIncome } from '@/actions/updateIncome';
import AppNotification from '../ui/Notifications';



const TabletIncomeMobile = ({ onToggle, filterData }: ExpensesProps) => {

  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Error' | 'Success' >('Success');

    const { data, fetchIncomes, addIsToggle, updateField } = useIncomeStore();
        const { session } = useAuthStore();
              
        const userId = session?.user?.id;
    const [add, setAdd] = useState(false);
     const [render, setRender] = useState(false);
    const isShowAdd = () => setAdd(prev => !prev);
      const isRender = () => setRender(prev => !prev);
      
        useEffect(() => {
            if (userId && filterData) {
               fetchIncomes(userId, filterData)
             }    
          }, [userId, filterData, render, add]);
    
            
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
        <section>
        <div className='mt-24 h-[450px] overflow-y-auto scrollbar-bt_col'>
            {data.map(({ _id, date, description, category, sum, isShow, isDelete }) => (
              <div key={_id.toString()} className="mx-5 flex justify-center items-center gap-5 mb-2 pb-2 border-2 border-t-transparent border-l-transparent border-r-transparent border-b-bg_fon">
                    {isShow ? (<>
                     <div className='w-[127px]'>
                        <input
                                id={_id.toString()}
                                name="description"
                                type="text"
                                 className='mb-1 text-sx text-text_color font-bold focus:outline-none'
                                defaultValue={description}
                                onChange={onChange}/>
                        <div className='flex items-center gap-3'>
                            <input
                                id={_id.toString()}
                                 name="date"
                                type="date" className='appearance-none text-[8px] text-text_color font-normal focus:outline-none'
                                defaultValue={toInputDate(date.toString())}
                                onChange={onChange}/>
                             <select className="appearance-none text-[8px] text-text_color font-normal focus:outline-none"  name="category" autoComplete="off" defaultValue="Select a category">
                                {
                                 categoryDb.map(({ id, name }) => (
                                    <option key={id} value={name}>
                                     {name}
                                    </option> 
                                                ))}        
                                </select>
                    
                        </div>
                     </div>
                                                
                            <input
                                id={_id.toString()}
                                name="sum"
                                type="number"
                                className='w-[84px] text-[11px] font-bold text-green focus:outline-none'
                                defaultValue={sum}
                                onChange={onChange}/>   
                    </>) : (<>
            <div className='w-[127px]'>
                <p className='mb-1 text-sx text-text_color font-bold'>{description}</p>
                <div className='flex items-center gap-3'>
                    <p className='text-[8px] text-text_color font-normal'>{formatDate(date.toString())}</p>
                    <p className='text-[8px] text-text_color font-normal'>{category}</p>
                </div>
            </div>
            <p className='w-[84px] text-[11px] font-bold text-green'>{sum} UAH.</p>
             </> )}
                  
            <div className='flex justify-center items-center'>
                <button onClick={async () => {
                    onDeleteToggle(_id.toString(), isDelete ?? false);
                const resultDelete = await deleteIncome(_id.toString(), userId ?? '');
                if (resultDelete.status !== 'error') {
                      setMessage(resultDelete.message);
                      if(setType)
                      setType('success');
                      if(setNotificationTitle)
                      setNotificationTitle('Success');
                      if (setNotificationIsOpen)
                      setNotificationIsOpen(true);  
                    
                  } else {
                       if(setMessage)
                       setMessage('Error: ' + (resultDelete.message));
                       if(setType)
                       setType('error');
                       if(setNotificationTitle)
                       setNotificationTitle('Error');
                       if(setNotificationIsOpen)
                       setNotificationIsOpen(true);    
                  }
                    isRender()
                if(onToggle)
                onToggle();
                }} className='flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full' type='button'><FaRegTrashCan className='size-[18px]'/></button>                   
                <button onClick={async () => {
                    onUpdateToggle(_id.toString(), isShow ?? false)
                    if (isShow) {
                     if (isShow && userId) {
                     const newIncome = {
                     id: _id.toString(),
                     date: new Date(date),
                     description,
                     category,
                    sum: Number(sum),
                    userId, 
                     };                   
                    const resultUpdate = await updateIncome(newIncome);
                    if (resultUpdate.status !== 'error') {
                      setMessage(resultUpdate.message);
                      if(setType)
                      setType('success');
                      if(setNotificationTitle)
                      setNotificationTitle('Success');
                      if (setNotificationIsOpen)
                      setNotificationIsOpen(true); 
                                        
                       } else {
                       if(setMessage)
                       setMessage('Error: ' + (resultUpdate.message));
                       if(setType)
                       setType('error');
                       if(setNotificationTitle)
                       setNotificationTitle('Error');
                       if(setNotificationIsOpen)
                       setNotificationIsOpen(true);   
                         }
                     isRender();
                 if(onToggle)
                 onToggle();
                  }    
                  }
                  }} className='flex justify-center items-center text-text_color w-8 h-8 hover:bg-bg_fon rounded-full' type='button'><BsFeather className='size-[18px]'/></button>
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
        {add && (<AddIncomeModule
          setMessage={setMessage}
          setNotificationIsOpen={setNotificationIsOpen}
          setType={setType}
          setNotificationTitle={setNotificationTitle}
          isShowAdd={isShowAdd} onToggle={onToggle} />)}
            {notificationIsOpen && (
          <AppNotification  
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}
       </section>
    )
}

export default TabletIncomeMobile;