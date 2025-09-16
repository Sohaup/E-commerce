import * as zod from "zod"

export const registerSchema = zod.object({
    name:zod.string("name must be string")
    .nonempty("name is required") ,
    email:zod.email(" email must be like example@gmail.com or example123@gmail.com ")
    .nonempty("email is required") ,
    password:zod.string("password must be string")
    .nonempty("password is required")
    .min(6 ,"re password must be at least 6 chars") ,
    rePassword:zod.string("re password must be string")
    .nonempty("re password is required")
    .min(6 ,"re password must be at least 6 chars") ,
    phone:zod.string("phone must be string")
    .nonempty("phone is required")
    .regex(/01[0125][0-9]{8}/ , "phone must be an egyption phone number")
}).refine(function (obj) {
    return obj.password === obj.rePassword
} , {
    path:['rePassword'] ,
    error:"password doesn`t match"
});

export type registerType = zod.infer<typeof registerSchema>;