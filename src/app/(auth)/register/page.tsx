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
import {SignUp} from "@/api/registerApi"
import { useRouter } from "next/navigation";

export default function page() {
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
    function onSubmit(values:registerType) {
        SignUp(values);
        navigate.push("/login");
    }
    return (
        <section className="cont">
            <form onSubmit={formControl.handleSubmit(onSubmit)} className="w-full px-5 lg:px-0 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-3">
                <legend className="text-3xl font-bold py-5">Register :</legend>
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
            </form>
        </section>
    )
}

