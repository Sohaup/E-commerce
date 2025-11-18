'use client'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { paymentSchema, paymentType } from '@/Schema/paymentSchema'
import creditLogo from "@/../public/images/payment/crdit_logo.png"
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { calcAmount, calcTotal, emptyCart } from '@/store/Slices/cartSlice'
import { toast } from 'sonner'
import { StoreType } from '@/store/store'
import { useEffect } from 'react'

export default function PaymentForm() {
    const navigate = useRouter();
    const formControl = useForm<paymentType>({
        defaultValues: {
            cardNumber: '',
            cvvNumber: '',
            expireMonth: '',
            expireYear: '',
            password: ''
        },
        mode: 'all',
        resolver: zodResolver(paymentSchema)
    });
    const dispatch = useDispatch<any>()
    const cartState = useSelector((store:StoreType)=> store.cartReducer);
    useEffect(()=> {
        dispatch(calcTotal());
    } , [])
    function onSubmit(values: paymentType) {
        console.log(values);
        try {  
        dispatch(emptyCart()); 
        dispatch(calcAmount());
        dispatch(calcTotal());
        navigate.push('/login');
        toast.success("successfuly payment")    
        } catch(err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }  
       
    }

    return (
        <Form {...formControl} >
            {/* The actual HTML form MUST be inside the <Form /> provider */}
            <form
                onSubmit={formControl.handleSubmit(onSubmit)}
                className="w-full bg-white py-5  rounded-lg shadow-lg mt-10 z-30 px-5  md:w-3/4 lg:w-1/2 xl:w-1/4 mx-auto flex flex-col gap-3"
            >
                <legend className="text-3xl font-bold py-5  ">
                      <svg width="200" height="60" viewBox="0 0 200 60">
                        <text
                            x="10"
                            y="40"
                            fontFamily="Arial"
                            fontSize="40"
                            fill="none"
                            stroke="black"
                            strokeWidth="1.5"
                        >
                            CheckOut
                        </text>
                    </svg>
                    <div className="group flex  justify-between items-center">                  
                    <Image src={creditLogo}  alt="credt card logo" className='w-40' />
                    <div className="amount">
                        <p>{cartState.totalPrice} Egp</p>
                    </div>
                    </div>
                    
                </legend>

                {/* Card Number */}
                <FormField
                    control={formControl.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className='flex flex-col justify-start items-start'>
                                <h2 className='text-xl'>Card Number</h2>
                                <p className='text-sm text-slate-400 font-sans'>Enter The 16 digit nuber on this card</p>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-slate-200 placeholder:text-slate-500 text-xl' placeholder='2354 - 5678 - 6789 - 9762' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* CVV */}
                <FormField
                    control={formControl.control}
                    name="cvvNumber"
                    render={({ field }) => (
                        <FormItem className='flex justify-between'>
                            <FormLabel className='flex flex-col justify-start items-start'>
                                <h2 className='text-xl'>CVV</h2>
                                <p className='text-sm text-slate-400 font-sans'>Enter The 3 digit nuber on this card expiration</p>
                            </FormLabel>
                             <div className="wrap w-1/2 flex flex-col gap-2 ">
                            <FormControl>
                                <Input {...field} className=' text-xl' placeholder='234' />
                            </FormControl>
                            <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="expire flex justify-between">
                    <div className="expire-label">
                        <label className='text-xl'>Expire date</label>
                        <p className='text-sm text-slate-400 font-sans'>Enter The Expiration Date Of The Card</p>
                    </div>
                    {/* Expire Month */}
                    <div className="expire-forms flex items-center gap-2">
                    <FormField
                        control={formControl.control}
                        name="expireMonth"
                        render={({ field }) => (
                            <FormItem>                                
                                <FormControl>
                                    <Input {...field} placeholder='09' className='text-xl'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                   
                    {/* Expire Year */}
                    <FormField
                        control={formControl.control}
                        name="expireYear"
                        render={({ field }) => (
                            <FormItem>                                                              
                                <FormControl>
                                    <Input {...field} placeholder='26' className='text-xl' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                </div>
                {/* Password */}
                <FormField
                    control={formControl.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className='flex justify-between' >
                            <FormLabel className='flex flex-col justify-start items-start'>
                                <h2 className='text-xl '>Password</h2>
                                <p className='text-sm text-slate-400 font-sans'>Enter Your Card Password</p>
                            </FormLabel>
                            <div className="wrap w-1/2 flex flex-col gap-2 ">
                                <FormControl >
                                    <Input type="password" {...field} className='text-xl' />
                                </FormControl>
                                <FormMessage />
                            </div>



                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-4 py-5">
                    CheckOut
                </Button>
            </form>
        </Form>
    )
}
