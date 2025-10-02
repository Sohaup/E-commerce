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
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react';
import { useForm } from "react-hook-form";
import { forgetType, forgetSchema } from "@/Schema/forgetSchema";
import { sendResetCode } from "@/services/forgetPasswordApi";
import { useRouter } from "next/navigation";


export default function page() {   
    return (
        <>
        <title>Forget password</title>
        <section className="w-full h-full">            
             <div className="cont authFormLg  flex items-center  ">
               <ForgetFormContainer/>
            </div>
        </section>
        </>
    )
}

function ForgetFormContainer() {
    const navigate = useRouter()
    const formControl = useForm<forgetType>({
        defaultValues: {
            email: "",
        },
        mode: "all",
        resolver: zodResolver(forgetSchema)
    });

    function onSubmit(values: forgetType) {
        sendResetCode(values, navigate);

    }
    return (
        <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3 bg-slate-100 p-5 rounded-lg  shadow-lg lg:bg-transparent lg:p-0 lg:rounded-0 lg:shadow-none"  >
            <legend className="text-3xl font-bold py-5">
                  <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                    <text
                        x="10"
                        y="40"
                        fontFamily="Arial, sans-serif"
                        fontSize="40"
                        fill="none"
                        stroke="black"
                        strokeWidth="1.5"
                    >
                        Forget
                    </text>
                </svg>
            </legend>
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



            </Form>
            <Button >send code</Button>

        </form>
    )
}



