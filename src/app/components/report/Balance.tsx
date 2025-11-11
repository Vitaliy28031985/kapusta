'use client'

const Balance = () => {
    return (
        <div className="flex items-center justify-center mob:mx-5 tab:mx-0 bg-white mt-8 mob:py-6 tab:py-4 mob:rounded-[20px] tab:rounded-full shadow-shadow">
            <div className="mob:px-[10px] tab:px-5 tab:flex items-center gap-2 border-r-2 border-text_op">
                <p className="text-text_color text-sm font-bold mob:text-center tab:text-start">Expenses:</p>
                <p className="text-red_color text-sm font-bold mob:text-center tab:text-start">- 18 000.00 UAN</p>
            </div>
            <div className="px-5 tab:flex items-center gap-2">
                <p className="text-text_color text-sm font-bold mob:text-center tab:text-start">Income:</p>
                <p  className="text-green text-sm font-bold mob:text-center tab:text-start">+45 000.00 UAN</p>
            </div>
        </div>
    )
}

export default Balance;