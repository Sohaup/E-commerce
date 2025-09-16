import { NextAuthOptions, Session, User } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { loginType } from "./Schema/loginSchema"
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { authInfoType } from "./types/authType";



export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        credentials({
            name: "creadentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                
                const credentialsValue = {
                    email: credentials?.email,
                    password: credentials?.password
                }
               
                const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method:"POST" ,
                    body: JSON.stringify(credentialsValue),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

                const payload = await response.json();
               
                
                if (payload.message == "success") {
                    const decodedToken: { id: string } = jwtDecode(payload.token);                    

                    return {
                        id: decodedToken.id,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    
                    
                    throw new Error("email or password is incorrect");
                }


            }  
            
            
        }) 
       

    ] ,
    callbacks: {
        async jwt({token , user}:{token:JWT; user?:(User| any)}) {
            if (user) {
                token.user = user.user ,
                token.token = user.token
           }
                            
            return token
        } ,

        async session({session , token}:{session:(Session | any ); token:JWT}) {
            if (token) {
             session.user = token.user ;
             session.token = token.token ;
            }
           
            return session
        }
    }
}