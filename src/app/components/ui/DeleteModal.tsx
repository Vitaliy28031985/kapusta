import { deleteExpense } from "@/actions/deleteExpense";
import { deleteIncome } from "@/actions/deleteIncome";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface DeleteModalProps {
    _id: string;
    userId: string;
    nameComponent?: string;
    toggle?: () => void;
    toggleData?: () => void;
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    setNotificationIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setType?: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
    setNotificationTitle?: React.Dispatch<React.SetStateAction<'Error' | 'Success'>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    _id,
    userId ,
    nameComponent,
    toggle,
    toggleData,
    setMessage,
    setNotificationIsOpen,
    setType,
    setNotificationTitle
}) => {
   

     //Закрити модaлку
       
       useEffect(() => {
         window.addEventListener('keydown', handleKeyDown);
         return () => {
         window.removeEventListener('keydown', handleKeyDown);
         } 
         }, []);
       
     
       const handleKeyDown = (e: KeyboardEvent): void => {
       if (e.code === 'Escape') {
         if(toggle) toggle();
       }
     };
   
     const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
     if (e.currentTarget === e.target) {
        if(toggle) toggle();
     }
   };
   
    async function OnDelete() {
        try {
            if (nameComponent === 'expenses') {
               const resultDelete = await deleteExpense(_id.toString(), userId ?? '');
                   if (resultDelete.status !== 'error') {
                      if(setMessage)
                       setMessage(resultDelete.message);
                      if(setType)
                      setType('success');
                      if(setNotificationTitle)
                      setNotificationTitle('Success');
                      if (setNotificationIsOpen)
                      setNotificationIsOpen(true);  
                    
                  } else {
                       if(setMessage)
                       setMessage('Error: ' + (resultDelete.message));
                       if(setType)
                       setType('error');
                       if(setNotificationTitle)
                       setNotificationTitle('Error');
                       if(setNotificationIsOpen)
                       setNotificationIsOpen(true);    
                }
                
            } 
            if (nameComponent === 'incomes') {
                const resultDelete = await deleteIncome(_id.toString(), userId ?? '');
                if (resultDelete.status !== 'error') {
                    if(setMessage)
                    setMessage(resultDelete.message);
                    if(setType)
                    setType('success');
                     if(setNotificationTitle)
                    setNotificationTitle('Success');
                    if (setNotificationIsOpen)
                     setNotificationIsOpen(true);  
                                    
                } else {
                      if(setMessage)
                      setMessage('Error: ' + (resultDelete.message));
                      if(setType)
                      setType('error');
                      if(setNotificationTitle)
                      setNotificationTitle('Error');
                      if(setNotificationIsOpen)
                      setNotificationIsOpen(true);    
                }
            }
            if (toggleData)
                    toggleData();
                if (toggle)
                    toggle()
          } catch {}
    } 
    
  

    return (
        <div onClick={handleBackdropClick}  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         
          <div className="relative
              desk:w-[494px]  tab:w-[494px] mob:w-[350px]
              bg-white px-[71px] p-8 rounded-[24px]  shadow-lg">
             <button type="button" onClick={toggle}  className='absolute top-3 right-3 border border-transparent p-2 text-text_color rounded-full hover:border-red_color hover:text-red_color'><AiOutlineClose className="size-5" /></button>
                <h4 className='text-2xl font-semibold text-center mt-8 desk:mt-0  tab:mt-0  mob:mt-5'>Are you sure?</h4> 
                <div className='flex gap-4 items-center mt-6 justify-center'>
                    <button onClick={OnDelete} className='w-[125px] text-base font-normal border border-bt_col text-bt_col py-4 rounded-[24px] hover:text-white focus:text-white hover:bg-bt_col focus:bg-bt_col' type='button'>YES</button>
                    <button onClick={toggle} className='w-[125px] text-base font-normal text-black border border-bg_fon py-4 rounded-[24px] hover:bg-bg_fon focus:bg-bg_fon' type='button'>NO</button>
                </div>   
            </div>   
                       
            
        </div>
    )
}

export default DeleteModal;