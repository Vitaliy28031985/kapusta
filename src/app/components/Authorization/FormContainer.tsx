'use client'
import { authorization } from "@/actions/authorization";
import Image from "next/image";

import {  useState } from "react";
import Login from "./login";
import Register from "./Register";
import { register } from "@/actions/register";
import { signInWithCredentials } from "@/actions/sign-in";
import AppNotification from "../ui/Notifications";




const FormContainer = () => {
  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Error' | 'Success' >('Success');
    

    const [chang, setChang] = useState(false);
    const [input, setInput] = useState<{ userName: string; email: string; password: string; confirmPassword: string; check: boolean }>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        check: false
});
    const toggleChange = () => {
        setChang(toggle => !toggle);
        setInput({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        check: false})
    };

    const onSubmit = async (formData: FormData) => { 
        const data = await authorization(formData);


        const receivedData = {
            userName: data?.userName ? data?.userName?.toString() : '', 
            email: data?.email?.toString(),
            password: data?.password?.toString(),
            confirmPassword: data?.confirmPassword ? data?.confirmPassword.toString() : ''
        };
        if(receivedData)
            setInput({ ...receivedData, check: true });
        
        
          if (
                !data?.userName?.toString() &&
                !data?.email?.toString() &&
                !data?.password?.toString() &&
                !data.confirmPassword?.toString()
            ) {
                  
            if(setMessage)
            setMessage('Error: ' + ('All fields must be filled in!'));
            if(setType)
            setType('error');
            if(setNotificationTitle)
            setNotificationTitle('Error');
            if(setNotificationIsOpen)
            setNotificationIsOpen(true);
             return;
            }

        if (data?.confirmPassword?.toString() || data?.userName?.toString()) {

           if (
                !data?.userName?.toString() ||
                !data?.email?.toString() ||
                !data?.password?.toString() ||
                !data.confirmPassword?.toString()
            ) {
                 
              if(setMessage)
              setMessage('Error: ' + ('All fields must be filled in!'));
              if(setType)
              setType('error');
              if(setNotificationTitle)
              setNotificationTitle('Error');
              if(setNotificationIsOpen)
              setNotificationIsOpen(true);
               return;
            }
         
            if (data?.password?.toString() !== data?.confirmPassword?.toString()) {
                alert("Passwords must match!");
                return;
            }

            const singUp = await register({ userName: receivedData.userName, email: receivedData.email, password: receivedData.password });
            if(setMessage)
            setMessage(singUp.message);
            if(setType)
            setType('success');
            if(setNotificationTitle)
            setNotificationTitle('Success');
            if (setNotificationIsOpen)
            setNotificationIsOpen(true);   
            }

        if (
            !data?.email?.toString() ||
            !data?.password?.toString()
        ) {
             
        if(setMessage)
        setMessage('Error: ' + ('All fields must be filled in!'));
        if(setType)
        setType('error');
        if(setNotificationTitle)
        setNotificationTitle('Error');
        if(setNotificationIsOpen)
        setNotificationIsOpen(true);
         return;
        }
        
     
        const result = await signInWithCredentials(receivedData.email, receivedData.password);
        if (result.status === 'error') {
        if(setMessage)
        setMessage('Error: ' + ('An error occurred while logging in!'));
        if(setType)
        setType('error');
        if(setNotificationTitle)
        setNotificationTitle('Error');
        if(setNotificationIsOpen)
        setNotificationIsOpen(true); 
        } else {
         if(setMessage)
        setMessage('Login was successful!');
        if(setType)
        setType('success');
        if(setNotificationTitle)
        setNotificationTitle('Success');
        if (setNotificationIsOpen)
        setNotificationIsOpen(true);  
           window.location.assign("/comment");   
        }
              
    }
    
    return (
        <div className="mob-[280px] tab:w-[426px] tab:mx-auto desk:mx-0 mob:mt-5 tab:mt-20 desk:mt-0 mob:px-[20px] tab:px-[83.5px] mob:py-[40px] tab:py-[56px] bg-white rounded-[60px] shadow-shadow">
            {chang ? (<p className="mb-5 text-text_color text-sx font-normal text-center">You can register with your Google Account:</p>) : (<p className="mb-5 text-text_color text-sx font-normal text-center">You can log in with your Google Account:</p>)}
            
            <button className="w-[119px] flex gap-1 mx-auto mb-8 px-5 py-3 bg-bg_fon text-text_color rounded-[50px] hover:border-bg_fon hover:bg-transparent hover:shadow-shadow" type="button">
                <Image src='/google.png' alt="google" width={19} height={18}></Image>
                Google</button>
            
            {chang ? (<p className="w-[254px] mb-5 text-text_color font-normal text-xs">Or register using an email and password:</p>) :
                (<p className="mb-5 text-text_color font-normal text-xs">Or log in using an email and password, after registering:</p>)}
            
            <form action={onSubmit}>
                
                {chang ? (<Register user={input}/>) : (<Login user={input}/>)}
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-3 shadow-shadow_bt bg-bt_col text-white  rounded-[16px] hover:bg-white  hover:text-bt_col hover:border-bt_col border-2"> {chang ? "Sing-UP" : "Sign-IN" }</button>
                    <button type="button"
                    onClick={toggleChange}
                    className="px-4 py-3 border-2 border-transparent shadow-shadow bg-bg_fon text-text_color rounded-[16px] hover:border-bg_fon hover:bg-transparent">{ chang ? "LOGIN" : "REGISTER" }</button>
                </div>
            </form>
         {notificationIsOpen && (
          <AppNotification  
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}
        </div>
    )
}

export default FormContainer;