import * as zod from "zod";

export const paymentSchema = zod.object({
    cardNumber:zod.string("card number must be string")
    .nonempty("card number is optional")
    .min(16 , "entr a valid credit card number ").max(16 , "entr a valid credit card number ")
    , 
    cvvNumber:zod.string("cvv number must be string")
    .nonempty("cvv number is optional")
    .min(3 , "entr a valid cvv  number ").max(3 , "entr a valid cvv  number ")
    ,
    expireMonth:zod.string("expire month must be string").nonempty("expire month is required")
    .regex(/^[0|1][0-9]$/ , "expire month must be a date on form like 05 or 11") ,
    expireYear:zod.string("expire year must be string").nonempty("expire year is required")
    .regex(/^[2][0-9]$/ , "expire year must be a two number of a comming date like 26 for 2026 or 27 for 2027  ") ,
    password:zod.string("password must be string").nonempty("password is required")
    .min(8 , "password cannot be less than 8 chars")
    .max(12 , "password cannot be more than 12 chars")
});

export type paymentType = zod.infer<typeof paymentSchema> 