'use client'

import { useState } from 'react';
import { category } from '../../../db/categoryIncome';
import { CategoryProps } from '@/app/interfaces/report';

const CategoryIncome = ({categoryData}: CategoryProps) => {
  const [nameCategory, setNameCategory] = useState('salary');
  
  categoryData(nameCategory);
    
    // console.log(nameCategory)

    return (
        <form className='mob:px-2 tab:px-10 desk:px-[115px] flex items-center justify-center flex-wrap mob:gap-12 tab:gap-14 desk:gap-20'>
            {category.map(({ id, icon, name, sum }) => (
              <label key={id}
              htmlFor={name} className={`flex flex-col items-center transition-all duration-300 desk:mt-0 tab:mt-3 mob:mt-9 cursor-pointer icon-container w-14 h-14 ${nameCategory === name.toLowerCase() ? '  text-bt_col' : ' text-text_color hover:text-bt_col'}`} >
              <p className='text-center text-sx font-normal mb-1'>{`${sum}.00`}</p>
              <div className='w-full mx-4' dangerouslySetInnerHTML={{ __html: icon }} />
              <input onChange={(e) => setNameCategory(e.target.value)} checked={nameCategory === name.toLowerCase()} type="radio" className="absolute opacity-0 w-0 h-0" name="category" id={name} value={name.toLowerCase()} />
              <p className='text-center tab:text-sx font-normal mb-2'>{name.toUpperCase()}</p>
            </label>
            ))}
             
    </form>
)
}

export default CategoryIncome;

