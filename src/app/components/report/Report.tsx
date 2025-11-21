'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { FaArrowLeft } from "react-icons/fa6";
import Balance from "./Balance";
import Category from "./Category";
import Graphs from "./Graphs";
import GraphsMobile from "./GraphsMobile";
import CategoryIncome from "./CategoryIncome";
import { useAuthStore } from "@/store/auth.store";
import { useExpenseStore } from "@/store/expenses-store";
import { useIncomeStore } from "@/store/incomes-store";
import { defaultData } from "@/app/interfaces/filter";
import { getBalance } from "@/utils/get-balance";
import { getSumExpenses, getSumIncomes } from "@/utils/get-sum-comments";
import { getGraphsData } from "@/utils/get-graphs-data";


const ReportContainer = () => {
  const { session} = useAuthStore();
  const [change, setChange] = useState(false)
  const [categoryData, setCategoryData] = useState<string>('');
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10));
    
    const { data: expenses, fetchExpenses } = useExpenseStore();
    
        const {data: incomes, fetchIncomes} = useIncomeStore()
    
 useEffect(() => {
        if (session?.user?.id) {
            fetchExpenses(session.user.id, defaultData);
            fetchIncomes(session.user.id, defaultData)
       }
         
    }, [session?.user?.id]);
  
  const toggle = () => setChange(toggle => !toggle)

   
  const handlePrev = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNext = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };


  const getCategoryData = (category: string) => {
          setCategoryData(category);
  }
    const expensesSum = getSumExpenses(expenses);

    const incomesSum = getSumIncomes(incomes);

 
    return (
        <main className="relative min-h-screen">
            
            <div className="relative tab:px-8 desk:px-[123px] pt-10 mob:h-[296px] tab:h-[526px]  bg-bg_fon mob:rounded-bl-[140px] tab:rounded-bl-[60px]  mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto">
               {/* header */}
                <section className=" tab:flex items-center justify-between">
                <Link className="mob:ml-5 tab:ml-0 flex  items-center gap-1 text-text_op text-xs font-normal" href="/comment"><FaArrowLeft className="size-6 text-bt_col" /> <p className="mob:hidden tab:inline">Main page</p></Link>
                <div className=" flex items-center   tab:gap-[251px] desk:gap-[298px] ">
                    <div className="mob:mb-8 tab:mb-0 mx-auto  tab:flex gap-5 items-center">
                    <p className="mob:mb-2 tab:mb-0 mob:text-center tab:text-start text-sx font-medium text-text_color">Balance:</p>
                    <div className="  py-3 pr-5 pl-2 border-2 border-white rounded-[16px]">
                        <p className="text-sx font-bold text-end">{`${getBalance(expenses, incomes).toFixed(2)} UAH`}</p>
                    </div>
                    <button className="w-[125px] mob:hidden desk:block py-3 px-[6px] border-2 border-white rounded-[16px] text-center text-text_color text-sx font-normal hover:text-text_op" type="button">CONFIRM</button>
                    </div>
                </div>

                <div className="flex flex-col items-center text-sm font-medium">
                   <p className="text-text_op text-sx font-normal mb-1">Current period:</p>
                   <div className="flex items-center pt-1">
                         <button  onClick={handlePrev} className="text-bt_col px-2 text-lg hover:text-orange-600">
                          &#10094;
                         </button>
                         <p className="w-[128px] font-bold text-sm mx-2">
                           {format(currentDate, "MMMM yyyy").toUpperCase()}
                         </p>
                            <button onClick={handleNext} className="text-bt_col px-2 text-lg hover:text-orange-600">
                                &#10095;
                             </button>
                   </div>
                 </div>    
                </section>
                <Balance expensesSum={expensesSum} incomesSum={incomesSum} />
               <section className="mob:h-[630px] tab:h-[368px] mt-8 py-5  tab:bg-white rounded-[30px]  tab:shadow-shadow">
            
                {/* tabs */}
               <div className="flex items-center justify-center gap-2 tab:mb-5">
              <button onClick={toggle} type="button" className="text-bt_col px-2 text-lg hover:text-orange-600">&#10094;</button>
              <p className="text-sm font-bold">{change ? 'INCOME' : 'EXPENSES'}</p>
              <button onClick={toggle} type="button" className="text-bt_col px-2 text-lg hover:text-orange-600">&#10095;</button>
              </div>
            {change ? (<CategoryIncome nameComments={'incomes'} data={incomes} categoryData={getCategoryData} />) : (<Category  nameComments={'expenses'} data={expenses ?? []} categoryData={getCategoryData}/>)}
               
                </section>
               <section className="h-[368px] relative z-20 mt-8 py-5 tab:px-9 desk:px-0  bg-white tab:rounded-[30px]  tab:shadow-shadow">
               <div className="mob:hidden tab:block"><Graphs data={change ? getGraphsData(incomes, categoryData) : getGraphsData(expenses, categoryData)}/></div>
               <div className="tab:hidden"><GraphsMobile data={change ? getGraphsData(incomes, categoryData) : getGraphsData(expenses, categoryData)}/></div>
               </section>     
          
        
            </div>
         
        <div className=" mob:hidden  desk:block relative top-[337px] mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto">
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

        <div className="relative mob:hidden tab:block desk:hidden top-[432px] left-[397px]">
                       
                        <div className="absolute top-[20px] 2xl:left-[559px] desk:left-[230px] tab:left-[103px] mob:left-[35px] rotate-90">
                        <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
                        </div>   
                        <div className="absolute top-[136px] mob:hidden tab:block 2xl:left-[559px] desk:left-[230px] tab:left-[103px]  w-[67px] h-[14px] bg-bg_fon rounded-full "></div>
                                    
                        
                                    
                                     
                        <div className="absolute   2xl:left-[653px] desk:left-[353px] tab:left-[200px] rotate-[360deg]">
                        <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
                        </div>
                        <div className="absolute top-[106px] mob:hidden tab:block 2xl:left-[653px] desk:left-[353px] tab:left-[200px] w-[67px] h-[14px] bg-bg_fon rounded-full "></div>  
                        
        </div>
      
        </main>
    )
}

export default ReportContainer;