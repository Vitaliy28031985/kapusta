'use client'

import Image from "next/image";
import FormContainer from "./FormContainer";
const Authorization = () => {
    return (
        <div className="relative ">
            <div className="relative h-[582.5px] bg-bg_fon rounded-bl-[60px] mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto ">
            <div className="mob:hidden tab:block">
            <div className="absolute top-[28px] left-[140px] rotate-90">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[91px] left-[10px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[177px] left-[152px] rotate-180">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[91px] left-[259px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[28px] left-[389px] -rotate-90">
            <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[91px] left-[508px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[28px] left-[638px] rotate-90">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[91px] left-[757px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[28px] left-[887px] -rotate-90">
            <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[91px] left-[1006px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[28px] left-[1136px] rotate-90">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
            <div className="absolute top-[165px] left-[1128px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
                </div> 
              <div className="absolute tab:hidden top-[104px] left-[271px] rotate-[120deg]">
                 <Image  src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
                </div> 

            </div>
            

            <div className=" desk:flex items-center justify-center w-full absolute z-30 mob:top-10 tab:top-20 desk:top-32  gap-40">
               <div className="mob:ml-5 tab:ml-0">
                    <h1 className="font-extrabold mob:text-[40px] tab:text-[102px] mob:text-start tab:text-center">Kapu$ta</h1>
                    <p className="text-text_color text-[16px] font-bold mob:text-start tab:text-center">SMART FINANCE</p>
               </div>
               <FormContainer/> 
            </div>
            
            <div className="mob:w-[320px] tab:w-[768px] desk:w-[1280px]">
                <div className="absolute top-[678px] 2xl:left-[559px] desk:left-[230px] tab:left-[103px] mob:left-[35px] rotate-90">
                <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
             </div>   
           <div className="absolute top-[778px] mob:hidden tab:block 2xl:left-[559px] desk:left-[230px] tab:left-[103px]  w-[67px] h-[14px] bg-bg_fon rounded-full "></div>
            

            
             
            <div className="absolute top-[658px] mob:hidden tab:block 2xl:left-[653px] desk:left-[353px] tab:left-[200px] rotate-[120deg]">
                <Image src='/kapusta.svg' alt="kapusta" width={83} height={89}></Image>
            </div>
           <div className="absolute top-[758px] mob:hidden tab:block 2xl:left-[653px] desk:left-[353px] tab:left-[200px] w-[67px] h-[14px] bg-bg_fon rounded-full "></div>  
            </div>
           
        </div>
)
};

export default Authorization;

