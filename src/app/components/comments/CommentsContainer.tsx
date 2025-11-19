'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChartSimple } from 'react-icons/fa6';
import Expenses from "./Expenses";
import ExpensesMobile from "./ExpensesMobile";
import Income from "./Income";
import IncomeMobile from "./IncomeMobile";
import { useAuthStore } from "@/store/auth.store";

import { useExpenseStore } from "@/store/expenses-store";
import { generatorOfGeneralizationByMonths } from "@/utils/generator-of-generalization-by-months";
import { useIncomeStore } from "@/store/incomes-store";
import { getBalance } from "@/utils/get-balance";
import { defaultData } from "@/app/interfaces/filter";


const CommentsContainer = () => {


    const { session} = useAuthStore();
    const [toggle, setToggle] = useState(false);

    const [name, setName] = useState('expenses');
  
    const [showFilter, setShowFilter] = useState(false);

    const { data, fetchExpenses } = useExpenseStore();

    const {data: incomes, fetchIncomes} = useIncomeStore()
   

    const isShowFilter = () => setShowFilter(filter => !filter);
 
    
   useEffect(() => {
        if (session?.user?.id) {
            fetchExpenses(session.user.id);
            fetchIncomes(session.user.id, defaultData)
       }
         
    }, [session?.user?.id, toggle]);
        

    const summaryExpenses = generatorOfGeneralizationByMonths(data); 
    const summaryIncomes = generatorOfGeneralizationByMonths(incomes);
    
  
    const onToggle = () => setToggle(toggle => !toggle);


    

    return (
    <main className="relative min-h-screen">
            <div className={!showFilter ? "relative pt-10 mob:h-[296px] tab:h-[526px]  bg-bg_fon mob:rounded-bl-[140px] tab:rounded-bl-[60px]  mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto" : "relative pt-10 mob:h-[526px] tab:h-[526px]  bg-bg_fon mob:rounded-bl-[140px] tab:rounded-bl-[60px]  mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto"}>
                
               {/* header */}
                <div className="mob:hidden tab:flex items-center   tab:gap-[251px] desk:gap-[298px] tab:ml-[32px] desk:ml-[473px]">
                    <div className="flex gap-5 items-center">
                    <p className="text-sx font-medium text-text_color">Balance:</p>
                    <div className="py-3 pr-5 pl-2 border-2 border-white rounded-[16px]">
                        <p className="text-sx font-bold text-end">{`${getBalance(data, incomes).toFixed(2)} UAH`}</p>
                    </div>
                    <button className="w-[125px] py-3 px-[6px] border-2 border-white rounded-[16px] text-center text-text_color text-sx font-normal hover:text-text_op" type="button">CONFIRM</button>
                    </div>
                    <Link className="flex gap-4 items-center text-text_color font-normal text-xs hover:text-text_op" href={'/financial-report'}>Reports <FaChartSimple className="size-6"/></Link>
                </div>
                
                
                <div className=" tab:hidden">
                <div className="flex justify-center mb-[35px]">
                  <Link className="flex gap-4 items-center text-text_color font-normal text-xs hover:text-text_op" href="/financial-report">Reports <FaChartSimple className="size-6"/></Link>      
                </div>
                
                    <p className="text-sx text-center font-medium text-text_color">Balance:</p>
                    <div className="flex justify-center items-center mt-2">
                        <div className="w-[140px] py-3 pr-5 pl-2 border-2 border-white rounded-l-[50px]">
                            <p className="text-sx font-bold text-end">00.00 UAH</p>
                        </div>
                        <button type="button" className="w-[142px] py-3 px-[6px] border-2 rounded-r-[50px] border-white text-start text-text_color text-sx font-normal hover:text-white hover:bg-bt_col">CONFIRM</button>
                    </div>
                </div>


                 {/* tabs */}
                <div className="mob:hidden tab:flex items-center mt-[92px] tab:ml-[32px] desk:ml-[91px]">
                    <div>
                        <label htmlFor="expenses" className={` ${name === 'expenses' ? 'block p-3 font-bold rounded-t-[16px] w-[138px] bg-tab_checked text-bt_col text-center' : 'block p-3 font-bold rounded-t-[16px] w-[138px] bg-tab_col text-center'}`}>Expenses</label>
                            <input onChange={(e) => setName(e.target.value)} type="radio"  className="absolute opacity-0 w-0 h-0" checked={name === "expenses"} name="toggle" id="expenses" value="expenses" />  
                    </div>
                    <div>
                        <label htmlFor="income" className={` ${name === 'income' ? 'block p-3 font-bold rounded-t-[16px] w-[138px] bg-tab_checked text-bt_col text-center' : 'block p-3 font-bold rounded-t-[16px] w-[138px] bg-tab_col text-center'}`}>Income</label>
                        <input onChange={(e) => setName(e.target.value)} type="radio"  className="absolute opacity-0 w-0 h-0" checked={name === "income"} name="toggle" id="income"  value="income" />
                    </div>
               
               
               
               
                </div>

              <div>
                    {name === 'expenses' ? (
                <div>
                   <div className="mob:hidden tab:block">
                   <Expenses summary={summaryExpenses} data={data ?? []} onToggle={onToggle} />
                   </div>
                    <div className="tab:hidden"><ExpensesMobile showFilter={showFilter} isShowFilter={isShowFilter}  data={data} onToggle={onToggle} toggle={toggle} /></div>         
                </div>
                    ) : (
                            <div>
                                <div className="mob:hidden tab:block"><Income summary={summaryIncomes} onToggle={onToggle} /></div>
                                <div className="tab:hidden"><IncomeMobile  onToggle={onToggle} toggle={toggle} /></div>
                            </div>
                    )}
            </div>   

            </div>

           

            
            <div className=" mob:hidden desk:block relative top-[137px] mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto">
              <div className="absolute  rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
             <div className="absolute top-[89px] left-[136px] rotate-180">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
             </div>
             <div className="absolute left-[272px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div> 
            <div className="absolute top-[89px] left-[391px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div> 
             <div className="absolute left-[527px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[89px] left-[663px] rotate-180">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute left-[799px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[89px] left-[935px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute left-[1071px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[89px] left-[1207px] rotate-180">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute left-[1343px] rotate-[360deg]">
                <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>    
            </div>

            <div className="relative mob:hidden tab:block desk:hidden top-[452px] left-[397px]">
               
                <div className="absolute top-[20px] 2xl:left-[559px] desk:left-[230px] tab:left-[103px] mob:left-[35px] rotate-90">
                <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
                </div>   
                <div className="absolute top-[136px] mob:hidden tab:block 2xl:left-[559px] desk:left-[230px] tab:left-[103px]  w-[67px] h-[14px] bg-bg_fon rounded-full "></div>
                            
                
                            
                             
                <div className="absolute   2xl:left-[653px] desk:left-[353px] tab:left-[200px] rotate-[360deg]">
                <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
                </div>
                <div className="absolute top-[106px] mob:hidden tab:block 2xl:left-[653px] desk:left-[353px] tab:left-[200px] w-[67px] h-[14px] bg-bg_fon rounded-full "></div>  
                
            </div>

            {/* mobile screen tabs */}
             <div className="tab:hidden flex gap-1  absolute bottom-0 left-0 w-full">
                  <div>
                        <label htmlFor="expenses" className={` ${name === 'expenses' ? 'block py-2 px-8 font-bold  w-[158px]  text-white bg-bt_col text-center' : 'block py-2 px-8 font-bold  w-[158px] bg-tab_col text-center'}`}>EXPENSES</label>
                            <input onChange={(e) => setName(e.target.value)} type="radio"  className="absolute opacity-0 w-0 h-0" checked={name === "expenses"} name="toggle" id="expenses" value="expenses" />  
                    </div>
                    <div>
                        <label htmlFor="income" className={` ${name === 'income' ? 'block py-2 px-8 font-bold  w-[158px] text-white bg-bt_col text-center' : 'block py-2 px-8 font-bold w-[158px] bg-tab_col text-center'}`}>INCOME</label>
                        <input onChange={(e) => setName(e.target.value)} type="radio"  className="absolute opacity-0 w-0 h-0" checked={name === "income"} name="toggle" id="income"  value="income" />
                    </div>
            </div>
    </main>)
}

export default CommentsContainer;

