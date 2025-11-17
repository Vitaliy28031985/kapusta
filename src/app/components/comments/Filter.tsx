'use client'

import { useRef, useState } from "react";
import { FaRegCalendarDays } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa';
import { Data, defaultData, FilterProps } from "@/app/interfaces/filter";


 
const Filter = ({filterData, category}: FilterProps) => {
  const [data, setData] = useState<Data>(defaultData);
  const [showMenu, setShowMenu] = useState(false);
  const [changeDate, setChangeDate] = useState(false);

  const isShowMenu = () => setShowMenu(toggle => !toggle);
  
  const dateRef = useRef<HTMLInputElement | null>(null);
  

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value,} = e.currentTarget;
        switch (name) {
          
          case 'date':
            setChangeDate(true);
            setData({ ...data, date: new Date(value) });
            break;
            case 'description':
            setData({...data, description: value});
            break;
            
            case 'category':
            setData({...data, category: value});
            break;
            
            case 'sum':
            setData({...data, sum: value});
            break;
                    
           default:
           return;  
        }
     }


  const openCalendar = () => {
   
    dateRef.current?.showPicker?.();
  };

  const formattedDate =
  data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : data.date ?? '';
  
const submit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (changeDate) {
   filterData({ ...data, action: true });
  } else {
    filterData({ ...data, action: true, date: null });
 }
  
};

  const clear = () => {
    filterData(defaultData);
    setData(defaultData);
    setChangeDate(false);
  };
  
  

  return (
    <form onSubmit={submit} className=" desk:flex items-center gap-8">
      <div className="flex items-center">
        <div className="flex items-center gap-[10px] w-fit">
        
          <button
            type="button"
            onClick={openCalendar}
            className="text-gray-500 hover:text-gray-700 mr-2"
          >
            <FaRegCalendarDays className="size-5"/>
          </button>

                
          <input
            ref={dateRef} 
            type="date"
            name="date"
            onChange={handleChange}
            value={formattedDate}
            className="appearance-none bg-transparent border-0 focus:outline-none text-text_color font-semibold
              [&::-webkit-calendar-picker-indicator]:opacity-0
              [&::-webkit-calendar-picker-indicator]:pointer-events-none"
          />
        </div>
              <div className="flex items-center">
                  <input placeholder="Product description" className="
                  tab:w-[200px] desk:w-[238px] h-10 py-1 px-5 border-l-2 border-t-2 border-b-2 rounded-tl-[16px] border-text_op text-sx text-filter_col font-normal focus:outline-none"
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                  type="text" />
                  <div className="relative">
                  <input placeholder="Product category" className="tab:w-[149px] desk:w-[169px]  h-10 py-1 px-5 
                   border-l-2 border-t-2 border-b-2 border-text_op text-sx text-filter_col font-normal focus:outline-none"
                      name="category" 
                      onChange={handleChange}
                      readOnly
                      value={data.category}
                      type="text" />
                      <button onClick={isShowMenu} className="absolute z-50 top-3 tab:right-1 desk:right-2  text-filter_col" type="button">
                       <FaAngleDown className="size-4"/>   
                      </button>
                    {showMenu && (
                    <div className="z-50 bg-white w-[182px]   absolute top-10 left-0 shadow-shadow_menu">
                    {category && category?.map(({ name, id }) => (
                   <div className=" 
                    px-5 py-1 text-menu_text font-normal text-sx hover:text-text_color hover:bg-bg_fon cursor-pointer
                    "
                        onClick={() => {
                          setData({ ...data, category: name });
                          isShowMenu();
                        }}
                        key={id}>  
                        {name}</div>
                    ))}
                   </div>
                    )}  
                   

                  </div>
                  <div className="relative">
                  <input placeholder="0,00" className="
                      p-1 tab:w-[111px] desk:w-[121px] h-10 border-2 border-text_op text-sx text-filter_col font-normal rounded-tr-[16px] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      name="sum"
                      onChange={handleChange}
                      value={data.sum}
                      type="number" />
                      <FaCalculator className=" z-50 top-3 right-4 absolute size-5 text-text_color"/>
                  </div>
              </div>   

      </div>

      <div className=" flex items-center justify-center gap-4 tab:mt-[34px] desk:mt-0">
        <button
          className="w-[136px] py-3 px-9 text-white bg-bt_col rounded-[16px] border-2 border-bt_col hover:bg-transparent hover:text-bt_col"
          type="submit"
        >
          INPUT
        </button>
        <button
          className="w-[136px] py-3 px-7 text-text_color border-2 border-text_color rounded-[16px] hover:border-text_op hover:text-text_op"
          type="button"
          onClick={clear}
        >
          CLEAR
        </button>
      </div>
    </form>
  );
};

export default Filter;
