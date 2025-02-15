"use client"
import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc" // npm i react-icons
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';


const ProviderLogin = () => {
    return (
        <div className='w-full flex flex-col gap-4'>
            <Button variant={"outline"} onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}><p className='flex items-center gap-3'>Login with Google <FcGoogle /></p></Button>
            <Button variant={"outline"} onClick={() => signIn('github', { redirect: false, callbackUrl: '/' })}><p className='flex items-center gap-3'>Login with Github <FaGithub /></p></Button>
        </div>
    )
}

export default ProviderLogin
