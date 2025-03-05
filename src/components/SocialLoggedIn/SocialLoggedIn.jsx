'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialLoggedIn = () => {

    const router = useRouter();
    const session = useSession();
    console.log(session)

    const handleSocialLogged = async (provider) => {
        try {
            await signIn(provider, { redirect: false, callbackUrl: '/' })

        } catch (error) {
            alert("Authentication Faild from error")
            console.log(error)
        }
    }


    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/');
            alert("Successfully Logged in")

        }
    }, [session?.status])


    return (
        <div className="flex gap-x-2 justify-center">
            <button className="p-4 rounded-full bg-[#F5F5F8]"><FaFacebookF color="#3B5998" size={16} /></button>
            <button className="p-4 rounded-full bg-[#F5F5F8]"><FaLinkedinIn color="#0A66C2" size={16} /></button>
            <button type='button' onClick={() => handleSocialLogged("google")} className="p-4 rounded-full cursor-pointer bg-[#F5F5F8]"><FcGoogle size={16} /></button>
        </div>
    );
};

export default SocialLoggedIn;