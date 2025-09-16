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
import {toast} from "sonner"



export default function page() {
    const formControl = useForm<loginType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit(values: loginType) {      
        
       const authResponse = await signIn("credentials" , {
            email:values.email ,
            password:values.password ,
            redirect:false ,
        })

        if (authResponse?.ok) {
            toast.success("logged in sucuussfuly");
            window.location.href = "/";
            
        } else {
            toast.error("incorrect email or password");
        }
    }
    return (
        <section className="cont">
            <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3">
                <legend className="text-3xl font-bold py-5">Login :</legend>
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
                <div className="flex mx-auto gap-5">
                    <Link href={"/forget"} className="text-green-500 underline">Forget Your password </Link>
                    <Link href={"/register"} className="text-blue-500 underline">don`t have an accout register</Link>
                </div>
            </form>

        </section>
    )
}

