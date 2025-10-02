import { registerType } from "@/Schema/registerSchema";
import { toast } from "sonner";

export async function SignUp(credentails:registerType ) {
    try {
     const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup" , {
        method:"POST" ,
        body:JSON.stringify(credentails) ,
        headers:{
            'content-type':"application/json"
        }
     });
    const data = await res.json();
    toast.success(data.message);
    } catch(err:any) {
       toast.error(err.message);    
    }
    
}