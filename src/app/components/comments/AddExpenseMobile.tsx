'use client'
import { useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import AddExpenseProps from "@/app/interfaces/addExpense";
import {category} from '../../../db/categoryExpenses';
import { addExpense } from "@/actions/addExpense";
import { useAuthStore } from "@/store/auth.store";


const AddExpenseModule = ({ isShowAdd, onToggle  }: AddExpenseProps) => {

  const { session } = useAuthStore();
      
      const userId = session?.user?.id;


    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
      window.removeEventListener('keydown', handleKeyDown);
      } 
      }, []);
    
  
    const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      if(isShowAdd) isShowAdd();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
  if (e.currentTarget === e.target) {
     if(isShowAdd) isShowAdd();
  }
};


   const onSubmit = async (formData: FormData) => { 
          if (userId) {
        formData.append("id", userId);
    }
        const data = await addExpense(formData);

        if (data.status !== 'error') {
            console.log("successfully", data.message)
        } else {
           console.log("Error", data.message);  
        }
       
        isShowAdd();
        if(onToggle)
        onToggle();
    }

return (

<div onClick={handleBackdropClick} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <section className="relative bg-white py-8 rounded-[16px] px-[20px] w-[300px] shadow-shadow">
        <button type="button" onClick={isShowAdd} className='absolute top-3 right-3 text-text_color border border-transparent p-2 rounded-full hover:border-red_color hover:text-red_color'><AiOutlineClose className="size-5" /></button>         
        <h4 className="mb-10 font-bold text-sm text-center">Add expense</h4>
        <form className="mt-10" action={onSubmit}>
            <div className="mb-10">
              <label htmlFor="date" className="flex items-start mb-3 text-sx font-normal">Date:</label>      
              <input className="px-5 w-full h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="date" id="date" name="date" autoComplete="off" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
                
            <div className="mb-10">
              <label htmlFor="description" className="flex items-start mb-3 text-sx font-normal">Description:</label>      
              <input className="px-5 w-full h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="text" id="description" name="description" autoComplete="off" defaultValue="" />
            </div>

            <div className="mb-10">
              <label htmlFor="category" className="flex items-start mb-3 text-sx font-normal">Category:</label>      
                <select className="px-5 w-full h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" id="category" name="category" autoComplete="off" defaultValue="" >
                {
                    category.map(({ id, name }) => (
                        <option key={id} value={name}>
                            {name}
                        </option> 
                    ))                
                }              
                </select>
            </div>

            <div className="mb-10">
              <label htmlFor="sum" className="flex items-start mb-3 text-sx font-normal">Sum:</label>      
              <input className="px-5 w-full h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="number" id="sum" name="sum" autoComplete="off" defaultValue="" />
            </div>
                
            <button className="px-8 py-3 shadow-shadow_bt bg-bt_col text-white  rounded-[16px] hover:bg-white  hover:text-bt_col hover:border-bt_col border-2">Save</button>
            
        </form>
    </section>
</div >
)
};

export default AddExpenseModule;
