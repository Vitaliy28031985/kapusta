'use client'

import { addExpense } from "@/actions/addExpense";
import {category} from '../../../db/categoryExpenses';
import AddExpenseProps from "@/app/interfaces/addExpense";

 
const AddExpense: React.FC<AddExpenseProps> = ({ isShowAdd }: AddExpenseProps) => {
    const onSubmit = async (formData: FormData) => { 
        const data = await addExpense(formData);
        console.log(data);
        isShowAdd();
    }
    return (
<form action={onSubmit}>
    <div  className="flex items-center py-1 mx-[2px] mb-[2px] bg-white shadow-shadow_menu">
        <div className="tab:w-[116px] desk:w-[136px] text-center text-sx font-normal text-text_op">
           <input className="appearance-none tab:pl-3 desk:pl-5 tab:pr-1  desk:pr-3  py-1 w-full tab:w-[116px] desk:w-[136px] focus:outline-none" type="date" autoComplete="off" defaultValue={new Date().toISOString().split('T')[0]} name="date" />        
        </div>
        <div className="tab:w-[190px] desk:w-[221px]  text-sx font-normal text-text_op">
            <input className="w-full tab:w-[190px] desk:w-[191px] focus:outline-none" type="text" placeholder="add description" name="description" autoComplete="off" defaultValue=""/>  
        </div> 
        <div className="w-full tab:w-[156px] desk:w-[179px] text-center text-sx font-normal text-text_op">
            <select className="appearance-none  w-full  desk:pl-5 tab:w-[106px] desk:w-[149px] focus:outline-none"  name="category" autoComplete="off" defaultValue="Select a category">
            {
            category.map(({ id, name }) => (
                <option key={id} value={name}>
                    {name}
                </option> 
            ))                
            }        
            </select>
        </div> 
        <div className="w-full tab:w-[105px] desk:w-[105px] text-center text-sx font-normal text-text_op">
            <input className="tab:pl-2 desk:pl-3 w-full tab:w-[105px] desk:w-[105px] focus:outline-none" type="number" placeholder="add sum" name="sum" autoComplete="off" defaultValue=""/>
        </div> 
        <div className="flex justify-center items-center tab:w-[105px] desk:w-[105px] gap-2 py-1">
        </div>   
    </div>
    <button className="absolute bottom-0 left-20 px-3 py-2 border-2 border-text_color text-text_color hover:border-text_op hover:text-text_op rounded-[16px]">Save</button>        
</form>
)
};

export default AddExpense;