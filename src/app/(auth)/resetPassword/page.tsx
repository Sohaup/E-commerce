 'use client'
 import { Button } from "@/components/ui/button"
 import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input";
 import Link from "next/link";
 import { zodResolver } from "@hookform/resolvers/zod"
 import React from 'react';
 import { useForm } from "react-hook-form";
 import { resetPaasswordType , resetPasswordSchema } from "@/Schema/resetPasswordSchema";
 import { resetPassword } from "@/api/resetPasswordApi";
 import { useRouter } from "next/navigation";
 
 export default function page() {
    const navigate = useRouter();
     const formControl = useForm<resetPaasswordType>({
         defaultValues: {           
             email: "",
             newPassword: "",          
         },
         mode: "all",
         resolver: zodResolver(resetPasswordSchema)
     });
     function onSubmit(values:resetPaasswordType) {
         resetPassword(values , navigate)
     }
     return (
         <section className="cont">
             <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3">
                 <legend className="text-3xl font-bold py-5">Reset :</legend>
                 <Form {...formControl}>                    
                      <FormField
                         control={formControl.control}
                         name="email"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel >Email :</FormLabel>
                                 <FormControl>
                                     <Input {...field} />
                                 </FormControl>
                                 <FormDescription />
                                 <FormMessage />
                             </FormItem>
                         )}
                     />
 
                      <FormField
                         control={formControl.control}
                         name="newPassword"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel >new Password :</FormLabel>
                                 <FormControl>
                                     <Input {...field} />
                                 </FormControl>
                                 <FormDescription />
                                 <FormMessage />
                             </FormItem>
                         )}
                     />
                     
                 </Form>
                 <Button >reset </Button>
                 
             </form>
            
         </section>
     )
 }