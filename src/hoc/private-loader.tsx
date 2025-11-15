"use client";


import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function PrivateLoader({ children }: { children: React.ReactNode }) {
 
  const router = useRouter()

  useEffect(() => {

    const { isAuth } = useAuthStore();
    const fetchUser = async () => {
       
      console.log(isAuth)
     
      if (!isAuth) {
        router.push('/');
      }
    };

   setTimeout(() => {
  fetchUser();  
}, 3000);


  }, []);

  return <>{children}</>;
}