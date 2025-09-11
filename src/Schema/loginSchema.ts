import * as zod from "zod"

export const loginSchema = zod.object({   
    email:zod.email(" email must be like example@gmail.com or example123@gmail.com ")
    .nonempty("email is required") ,
    password:zod.string("password must be string")
    .nonempty("password is required")
    .min(6 ,"re password must be at least 6 chars")    
});

export type loginType = zod.infer<typeof loginSchema>;