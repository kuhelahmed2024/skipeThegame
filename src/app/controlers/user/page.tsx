"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'
import LeftSide from "./components/leftSide"
import RightSide from "./components/rightSite"
import Link from "next/link"
import axios from "axios"
import React from 'react';
import DOMPurify from "dompurify"

import { Suspense } from "react"



import 'react-toastify/dist/ReactToastify.css';
import WarningToast from "@/src/components/toast/WarningToast"
import InfoToast from "@/src/components/toast/InfoToast"

import { Button, Result, Spin } from 'antd';


const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;


const AdminPage: React.FC = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [MyId, setMyId] = useState("")
    const [MyUrl, setMyUrl] = useState("")
    const [GetShowItemName, setGetShowItemName] = useState("dashboard")
    const [showLoding, setshowLoding] = useState(true)
    const [Unaouth, setUnaouth] = useState(false)
    const [svError, setsvError] = useState(false)

    const newClickEvent = (showSliedName: string) => {
        setGetShowItemName(showSliedName)
        router.push(`/controlers/user?section=${showSliedName}`)
    }

    const checkUser = async () => {
        const response = await axios.post('/api/users/checkUser')

        const ms = response.data.message;
        const st = response.data.status;

        if (st === 500) {
            WarningToast({ message: ms })
            setsvError(true)
            return
        } else if (st === 400) {
            InfoToast({ message: ms })
            setUnaouth(true)
            return
        } else if (st === 200) {
            setshowLoding(false)
            setMyId(response.data.id)
            setMyUrl(response.data.url)

        }
    }

    // Function to sanitize the parameter
    const sanitizeQueryParam = (param: string): string | null => {
        // Using DOMPurify to remove potentially malicious code
        const cleanParam = DOMPurify.sanitize(param);

        // Additional sanitization: Remove any non-alphanumeric characters except spaces, hyphens, and underscores
        const sanitized = cleanParam.replace(/[^\w\s-_]/g, '');
        return sanitized || null;
    };

    useEffect(() => {
        checkUser()
        const searchParams = new URLSearchParams(window.location.search);
        const myParam = searchParams.get('section');

        if (myParam) {
            // Validate and sanitize the parameter
            const sanitizedParam = sanitizeQueryParam(myParam);
            if (sanitizedParam) {
                setGetShowItemName(sanitizedParam);
                // Optionally: send it to your backend or use it in your app logic
            }
        }
    }, []);

    return (
        <>
            {
                svError ?
                    <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                    :
                    showLoding ?
                        <main className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center">
                            {
                                Unaouth ?
                                    <Result
                                        status="403"
                                        title="403"
                                        subTitle="Sorry, you are not authorized to access this page."
                                        extra={<Link href={"/controlers/login"}><Button type="primary">Back Home</Button></Link>}
                                    />
                                    :
                                    <Spin tip="Loading" size="large">
                                        {content}
                                    </Spin>
                            }

                        </main>
                        :
                        <main className="w-screen h-screen flex">
                            <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><span>Loading</span></div>}>
                                <LeftSide clickEvent={newClickEvent} />
                            </Suspense>

                            <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><span>Loading</span></div>}>
                                <RightSide setShowName={GetShowItemName} myid={MyId} myurl={MyUrl} />
                            </Suspense>

                        </main>
            }
        </>
    )
}
export default AdminPage











