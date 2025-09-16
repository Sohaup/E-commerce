import * as zod from "zod"

export const forgetSchema = zod.object({   
    email:zod.email(" email must be like example@gmail.com or example123@gmail.com ")
    .nonempty("email is required") 
   
});

export type forgetType = zod.infer<typeof forgetSchema>;