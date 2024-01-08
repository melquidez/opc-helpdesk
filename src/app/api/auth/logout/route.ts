import { NextApiRequest, NextApiResponse } from "next";
import { clearAuthToken, isLoggedIn } from '@/tools/auth'
import { redirect } from 'next/navigation'

export const GET = async () => {

    if(isLoggedIn()){
        clearAuthToken()
        redirect('/login')
        return Response.json({});
    }
    redirect('/login');
    return Response.json({});
}
