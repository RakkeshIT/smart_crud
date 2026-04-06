'use client'
import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth()


    useEffect(() => {
        const loadAuth = async () => {
            const token = await getToken();
            console.log("TOKEN:", token);
        }
        loadAuth()
    }, []);

    return (
        <>{children}</>
    )

}

export default AuthProvider