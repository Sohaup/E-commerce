import { forgetType } from "@/Schema/forgetSchema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export async function sendResetCode(credentails:forgetType , navigate:AppRouterInstance ) {
     
    try {
     console.log(JSON.stringify(credentails));
                
     const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , {
        method:"POST" ,
        body:JSON.stringify(credentails) ,
        headers:{
            'content-type':"application/json"
        }
     });
    const data = await res.json();   
    toast.success(data.message);
    navigate.push("/verify");
    } catch(err) {
       if (err instanceof Error)
       toast.error(err.message);    
    }
    
}