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
import { verifyType, verifySchema } from "@/Schema/verifySchema";
import { sendResetCode } from "@/services/forgetPasswordApi";
import { useRouter } from "next/navigation";
import { verifyCode } from "@/services/verifyApi";



export default function page() {
  
    return (
        <>
        <title>verify token</title>
        <section className="w-full h-full">           
            <div className="cont authFormLg  flex items-center  ">
                <AuthFormContainer />
            </div>
        </section>
        </>
    )
}

function AuthFormContainer() {
      const navigate = useRouter();
    const formControl = useForm<verifyType>({
        defaultValues: {
            resetCode: "",
        },
        mode: "all",
        resolver: zodResolver(verifySchema)
    });

    function onSubmit(values: verifyType) {
        verifyCode(values, navigate);
    }
    return (
        <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3 bg-slate-100 p-5 rounded-lg  shadow-lg lg:bg-transparent lg:p-0 lg:rounded-0 lg:shadow-none">
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
                        Verify
                    </text>
                </svg>
            </legend>
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

    )
}