'use server'
import { authOptions } from '@/auth';
import { Token } from '@/types/authType';
import { decode, getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function returnToken() {
    const cookiesData = cookies();
    const encryptedToken = (await cookiesData).get('next-auth.session-token');
    const decryptedToken = await decode({token:encryptedToken?.value , secret:process.env.AUTH_SECRET!})
    return decryptedToken; 
    
}

