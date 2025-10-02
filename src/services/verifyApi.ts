import { verifyType } from "@/Schema/verifySchema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {toast} from "sonner"

export async function verifyCode(credentails:verifyType , navigate:AppRouterInstance ) {
     
    try {
     console.log(JSON.stringify(credentails));
                
     const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , {
        method:"POST" ,
        body:JSON.stringify(credentails) ,
        headers:{
            'content-type':"application/json"
        }
     });
    const data = await res.json();   
    toast.success("verified code successfuly");
    navigate.push("/resetPassword");
    } catch(err:any) {
       toast.error(err.message);    
    }
    
}