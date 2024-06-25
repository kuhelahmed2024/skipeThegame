"use client"
import WorldIcon from "@/public/icon/world"
import UsetImage from "@/public/image/profile-logo.png"
import UserIcon from "@/public/icon/user"
import AddIcon from "@/public/icon/add"
import LoockIcon from "@/public/icon/loock"
import LogOtuIcon from "@/public/icon/log-out"
import Notification from "@/public/icon/notification"
import LodingIcon from "@/public/icon/loding"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from 'react';
import { Button, Result, message, Popconfirm } from 'antd';

import AdminAddUser from "./components/user/addUse"
import AdminUserList from "./components/user/userList"

import { useState } from "react"
import { Badge, Space } from "antd"

import type { PopconfirmProps } from 'antd';
import axios from "axios"

interface RightComponentProps {
    setShowName: string;
}


const RightSide: React.FC<RightComponentProps> = ({ setShowName }) => {
    const [showMiniProfileSections, setShowMiniProfileSections] = useState(false)
    const [showMiniNotificationSections, setShowMiniNotificationSections] = useState(false)
    const [LogOutLoding, setLogOutLoding] = useState(false)

    const router = useRouter()

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        setLogOutLoding(true)
        const response = await axios.get("/api/admin/user/logout")
        if(response.data.status === 500){
            setLogOutLoding(false)
            message.error('Something went wrong!');
        }else if(response.data.status === 200){
            setLogOutLoding(false)
            message.success(response.data.message);
            setTimeout(() => {
                router.push("/controlers")
            },1000)
        }
    };
    
    const cancel: PopconfirmProps['onCancel'] = (e) => {
        message.success(':)');
    };

    return (
        <main className="w-[83vw] h-full flex flex-col">
            <div className={` ${showMiniProfileSections ? "flex" : "hidden"} w-60 gap-2 h-auto p-2 transition-all duration-300 right-10 border_full flex-col rounded-lg shadow-lg z-20 bg-white rounded-b-md fixed top-14`}>
                <div className="w-full h-52 gap-2 flex flex-col justify-center items-center border-b-2 border-slate-500">
                    <Image src={UsetImage} alt="User Profile Logo" className="w-28 h-28 rounded-full shadow-lg" />
                    <div className="w-full h-auto flex flex-col justify-center items-center gap-0">
                        <span className="text-xl font-semibold">mdkuhelahmeh</span>
                        <span className="text-sm">Administrator</span>
                        <span className="text-zinc-500 text-sm">Administrator@gmail.com</span>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-10 p-2 flex gap-2 cursor-pointer transition-all duration-75 text-sm font-medium rounded-md hover:bg-slate-300 hover:text-blue-500 items-center">
                        <UserIcon />
                        <span>Profile</span>
                    </div>
                    <div className="w-full h-10 p-2 flex gap-2 cursor-pointer transition-all duration-75 text-sm font-medium rounded-md hover:bg-slate-300 hover:text-blue-500 items-center">
                        <LoockIcon />
                        <span>Password change</span>
                    </div>
                    <Popconfirm
                        title="Log out Confirmation"
                        description="Are you sure to Log out?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        {/* <Button danger>Delete</Button> */}
                        <div className="w-full h-10 p-2 flex gap-2 cursor-pointer transition-all duration-75 text-sm font-medium rounded-md hover:bg-slate-300 hover:text-blue-500 items-center">
                            {
                                LogOutLoding ? <LodingIcon/> : <LogOtuIcon />
                            } 
                            <span>Log out</span>
                        </div>
                    </Popconfirm>

                </div>
            </div>

            <div className={` ${showMiniNotificationSections ? "flex" : "hidden"} w-72 h-[424px] border_full transition-all duration-300 right-56 flex-col rounded-lg shadow-lg z-20 bg-white rounded-b-md fixed top-14`}>
                <div className="w-full h-10 flex border_bottom items-center text-lg text-slate-900 px-3 font-medium">
                    <span>Notification</span>
                </div>
                <div className="w-full h-[352px] overflow-y-auto rounded-t-lg px-2 py-1 styleSliedBar">
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-14 hover:bg-slate-200 rounded-md flex cursor-pointer">
                        <div className="w-16 h-full flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
                                <UserIcon />
                            </div>
                        </div>
                        <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                            <h2 className="text-sm font-medium">Booking</h2>
                            <span className=" text-xs text-neutral-500">
                                A new Booking Username
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-8 rounded-b-lg flex border_top justify-center items-center text-xs text-neutral-400">
                    <span className="transition-all duration-150 cursor-pointer hover:text-green-500 ">See all..</span>
                </div>
            </div>

            <header className="w-full flex justify-between items-center h-16 bg-white px-5 relative">
                <div className="w-10 h-10  bg-white absolute -bottom-5 -left-5 rounded-full"></div>
                <div className=" w-auto h-full flex items-center gap-3 p-3">
                    <Link href={"/"} target="_blank">
                        <div className="p-2 bg-slate-200 rounded-full text-slate-600 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
                            <WorldIcon />
                        </div>
                    </Link>
                    <div className="p-2 flex justify-center items-center gap-2 rounded-full hover:bg-blue-700 bg-blue-400 text-white transition-all duration-300 cursor-pointer">
                        <AddIcon /> Add new car
                    </div>
                </div>

                <div className=" w-auto h-full flex justify-end items-center gap-3 p-3">
                    <Space size="middle">
                        <Badge size="small" count={99}>
                            <div onClick={() => { setShowMiniNotificationSections(showMiniNotificationSections ? false : true) }} className="p-2 bg-slate-200 rounded-full text-slate-500 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
                                <Notification style={{ height: "20px", width: "20px" }} />
                            </div>
                        </Badge>
                    </Space>

                    <div onClick={() => { setShowMiniProfileSections(showMiniProfileSections ? false : true) }} className="h-full pr relative w-auto flex flex-col justify-center items-center hover:bg-slate-200 p-3 rounded-md cursor-pointer transition-all duration-300 ">
                        <div className=" w-auto h-auto flex justify-center items-center gap-3">
                            <div className="w-auto h-auto flex flex-col justify-center items-end">
                                <span className="text-sm font-semibold">mdkuhelahemeh</span>
                                <span className=" text-xs text-slate-500">Administrator</span>
                            </div>
                            <div className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                                <Image priority={true} src={UsetImage} className="w-full h-full rounded-full" alt="User Profile logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="w-full rounded-tl-3xl z-10 p-2 bg-slate-200 h-[90vh] overflow-y-auto styleSliedBar">

                {setShowName === "dashboard" && "dashboard"}
                {setShowName === "link" && "link"}
                {setShowName === "informasion" && "informasion"}
                {setShowName === "createUser" && <AdminAddUser />}
                {setShowName === "allUser" && <AdminUserList />}

                {
                    setShowName !== "dashboard" &&
                    setShowName !== "link" &&
                    setShowName !== "informasion" &&
                    setShowName !== "createUser" &&
                    setShowName !== "allUser" &&
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<a href={"/admin?section=dashboard"}><Button type="primary">Back Home</Button></a>}
                    />
                }

            </section>
        </main>
    )
}

export default RightSide



