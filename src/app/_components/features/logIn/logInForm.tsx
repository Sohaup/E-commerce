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
import { loginType, loginSchema } from "@/Schema/loginSchema";
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export default function LoginFormContainer() {
    const formControl = useForm<loginType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
        resolver: zodResolver(loginSchema)
    });
   

    async function onSubmit(values: loginType) {

        const authResponse = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })

        if (authResponse?.ok) {
            toast.success("logged in sucuussfuly");
            window.location.href = "/";

        } else {
            toast.error("incorrect email or password");
        }
    }

    return (

        <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3 ">
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
                        Login
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

                <FormField
                    control={formControl.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >Password :</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </Form>
            <Button >Login</Button>
            <div className="flex mx-auto gap-2 lg:gap-5 flex-col lg:flex-row capitalize">
                <Link href={"/forget"} className="text-slate-500">Forget Your password </Link>
                <Link href={"/register"} className="text-slate-500 ">
                    don`t have an accout
                    <span className="underline text-green-400 px-2">register</span>
                </Link>
            </div>
        </form>

    )
}


