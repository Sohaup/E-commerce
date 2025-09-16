export interface authInfoType {
    token:string , 
    user:user
} 

export type user = {
    name:string ,
    email:string ,
    role:string 
}

export type Token = {
    sub:string ,
    iat:string ,
    token:string ,
    jti:string ,
    user:user
} 