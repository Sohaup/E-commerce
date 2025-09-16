import * as zod from "zod"

export const verifySchema = zod.object({   
    resetCode:zod.string(" reset code must be string ")
    .nonempty("reset code  is required") 
   
});

export type verifyType = zod.infer<typeof verifySchema>;