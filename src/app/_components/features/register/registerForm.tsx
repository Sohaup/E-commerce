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
import { registerSchema, registerType } from "@/Schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from "react-hook-form"
import { SignUp } from "@/services/registerApi"
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterFormContainer() {
    const navigate = useRouter();
    const formControl = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        mode: "all",
        resolver: zodResolver(registerSchema)
    });
    function onSubmit(values: registerType) {
        SignUp(values);
        navigate.push("/login");
    }
    return (

        <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3">
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
                        Register
                    </text>
                </svg>
            </legend>
            <Form {...formControl}>
                <FormField
                    control={formControl.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >Name :</FormLabel>
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
                <FormField
                    control={formControl.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >re Password :</FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >Phone :</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
            <Button >Register</Button>
            <div className="flex mx-auto gap-5">
                <Link href={"/login"} className="text-slate-500 capitalize ">
                    already had an account
                    <span className="underline text-green-400 px-2">logIn</span>
                </Link>
            </div>
        </form>

    )
}
