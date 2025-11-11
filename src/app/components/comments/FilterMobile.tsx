'use client'
import { useRef, useState } from "react";
import { FaAngleDown, FaCalculator, FaRegCalendarDays } from "react-icons/fa6";
import { Data, defaultData, FilterProps } from "@/app/interfaces/filter";
import categories from '../../../db/category.json';

const FilterMobile = ({ filterData }: FilterProps) => {
    const [data, setData] = useState<Data>(defaultData);
      
    const [showMenu, setShowMenu] = useState(false);
    
      const isShowMenu = () => setShowMenu(toggle => !toggle);
      
      const dateRef = useRef<HTMLInputElement | null>(null);
      
    
       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value,} = e.currentTarget;
            switch (name) {
              
               case 'date':
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
          : data.date;
      
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      filterData(data)
    };
    
    const clear = () => {
        setData(defaultData);
        filterData(data);
    }
      
      
    return (
    <form onSubmit={submit} className="w-full h-full block mt-4 ">
      <div className="flex items-center gap-[10px] w-fit mx-[100px]">
              
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
      <input placeholder="Product description" className="
       w-[280px] h-[44px] mx-5 mt-4 py-1 px-5   border-2  rounded-tl-[16px] rounded-tr-[16px] border-white bg-transparent text-sx text-filter_col font-normal focus:outline-none"
      name="description"
      onChange={handleChange}
      value={data.description}
      type="text" />  
        <div className="relative">
            <input placeholder="Product category" className=" w-[280px] h-[44px] mx-5 py-1 px-5 border-2  rounded-br-[16px] border-white bg-transparent text-sx text-filter_col font-normal focus:outline-none"
            name="category" 
            onChange={handleChange}
            readOnly
            value={data.category}
            type="text" />
                <button onClick={isShowMenu} className="absolute z-50 top-3 right-7  text-filter_col" type="button">
                    <FaAngleDown className="size-4"/>   
                </button>
                {showMenu && (
                <div className="z-50 bg-white w-[280px]   absolute top-10 left-5 shadow-shadow_menu">
                {categories && categories.expenseCategories.map(({ name, id }) => (
                <div className=" px-5 py-1 text-menu_text font-normal text-sx hover:text-text_color hover:bg-bg_fon cursor-poi  "
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
            mt-[32px] mx-[68px] p-1 px-11 w-[185px] h-[44px] border-2 border-white bg-transparent text-sx text-filter_col font-normal rounded-full focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            name="sum"
            onChange={handleChange}
            value={data.sum}
            type="number" />
            <FaCalculator className=" z-40 top-11 right-20 absolute size-5 text-text_color"/>
        </div>
            

         <div className="mt-40 flex items-center justify-center gap-4">
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
)
};

export default FilterMobile;