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
import { verifyType , verifySchema } from "@/Schema/verifySchema";
import { sendResetCode } from "@/api/forgetPasswordApi";
import { useRouter } from "next/navigation";
import { verifyCode } from "@/api/verifyApi";

export default function page() {
    const navigate = useRouter();
    const formControl = useForm<verifyType>({
        defaultValues: {           
           resetCode: "",                 
        },
        mode: "all",
        resolver: zodResolver(verifySchema)
    });

    function onSubmit(values:verifyType) {          
        verifyCode(values , navigate);        
    }
    return (
        <section className="cont">
            <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3">
                <legend className="text-3xl font-bold py-5">verify :</legend>
                <Form {...formControl}>                    
                     <FormField
                        control={formControl.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >reset code :</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />                  
                    
                </Form>
                <Button >verify</Button>
                
            </form>
           
        </section>
    )
}
