'use client'
import Image from "next/image";
import { HiMiniArrowRightStartOnRectangle } from 'react-icons/hi2';
const Header = () => {
    const isLogin = true
    return (
        <header >
            <div className="py-3 px-4 mob:w-[320px] tab:w-[768px] desk:w-[1280px] mx-auto flex justify-between">
                <Image src='/logo.svg' alt="Kapusta" width={90} height={31} priority></Image>
                
                {isLogin && (<div className="flex items-center gap-4">
                    <div className="w-[32px] h-[32px] bg-bg_fon rounded-full flex items-center justify-center">
                        <p className="font-bold text-text_color">U</p>
                    </div>
                        <p className="mob:hidden tab:block text-text_op text-xs font-normal">User Name</p>
                 <button type="button" className="mob:block tab:hidden text-text_color hover:text-text_op"><HiMiniArrowRightStartOnRectangle/></button>
                    <button type="button" className="mob:hidden tab:block text-text_color text-xs font-normal underline  px-3 border-l-4 border-gray-600 hover:text-text_op">Exit</button>
                </div>)}
            </div>
     
        </header>
    )
}

export default Header;
