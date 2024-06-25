"use client"
import axios from "axios"
import AddFile from "@/public/icon/addFile"
import { useState, useRef, useEffect } from "react"
import ButtonLoding from "@/public/icon/loding"
import ClossButton from '@/public/icon/cancle'
import { CheckEmail, CheckPassword } from "@/src/helpers/check-email-&-pass"

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import WarningToast from "@/src/components/toast/WarningToast"
import InfoToast from "@/src/components/toast/InfoToast"

export default function AdminAddUser() {
    const [lodingState, setlodingState] = useState(false)
    const [showpassAlert, setshowpassAlert] = useState(false)
    const [newUserData, setnewUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
        userLogo: File
    })

    const handleFormSubmit = async () => {
        if (lodingState) {
            WarningToast({ message: "Your request is processing" })
            return
        }
        
        if (newUserData.firstName === "" || newUserData.lastName === "") {
            InfoToast({message: "Please Insert your name"})
            setlodingState(false)
            return
        }
        
        if (newUserData.email) {
            if (!CheckEmail({ email: newUserData.email })) {
                InfoToast({message: "Invalide Email type"})
                setlodingState(false)
                return
            }
        } else {
            InfoToast({message: "Email is requared"})
            setlodingState(false)
            return
        }

        const chackpass = CheckPassword({
            lowercase: true,
            uppercase: false,
            number: false,
            spesialchar: false,
            length: 8,
            pass: newUserData.password
        })

        if (newUserData.password !== "") {
            if (chackpass === false) {
                WarningToast({message: "Please Create a strong password"})
                setlodingState(false)
                setshowpassAlert(true)
                return
            }
        } else {
            InfoToast({message: "Create a Password"})
            setlodingState(false)
            return
        }
        if (newUserData.password !== newUserData.cpassword) {
            InfoToast({message: "Password doesn't match"})
            setlodingState(false)
            return
        }


        setlodingState(true)
        const toastId = toast.loading("Please wait...", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })

        const response = await axios.post("/api/admin/user/addUser",  { data: newUserData})

        const responseStatus = response.data.status
        const responseMessage = response.data.message

        console.log(response.data)

        if (responseStatus === 500) {
            toast.update(toastId, { render: "Something went wrong", type: "warning", isLoading: false })
            setlodingState(false)
            return
        } else if (responseStatus === 400) {
            toast.update(toastId, { render: responseMessage, type: "info", isLoading: false })
            setlodingState(false)
            return
        } else if (responseStatus === 202) {
            toast.update(toastId, { render: responseMessage, type: "info", isLoading: false })
            setlodingState(false)
            return
        } else if (responseStatus === 200) {
            toast.update(toastId, { render: responseMessage, type: "success", isLoading: false })
            setlodingState(false)
            return
        } else {
            toast.update(toastId, { render: ":(", type: "warning", isLoading: false })
            setlodingState(false)
            return
        }

    }

    return (
        <main className="w-full relative h-auto flex justify-center p-2">
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
                theme="colored"
            />

            <div className="w-auto h-auto flex flex-col bg-slate-50 gap-5 shadow-lg rounded-lg p-6">
                <div className="w-full border-b-2 h-14 flex justify-between items-center text-xl font-extrabold relative">
                    <span className="w-auto h-auto flex after:w-10 after:rounded-full after:absolute after:top-[75%] after:bg-fuchsia-500 after:h-1">
                        Add New User
                    </span>
                </div>
                <div className="w-full gap-5 h-full rounded-md flex flex-col items-center">
                    <div className="w-full h-auto flex gap-5">
                        <div className="w-1/2 h-full flex flex-col gap-6">
                            <div className="w-[300px]">
                                <div className="relative w-full min-w-[200px] h-14">
                                    <input
                                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                                        placeholder=" "
                                        onChange={(e) => { setnewUserData({ ...newUserData, firstName: e.target.value }) }}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        First Name
                                    </label>
                                </div>
                            </div>
                            <div className="w-[300px]">
                                <div className="relative w-full min-w-[200px] h-14">
                                    <input
                                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                                        placeholder=" "
                                        onChange={(e) => { setnewUserData({ ...newUserData, email: e.target.value }) }}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Email
                                    </label>
                                </div>
                            </div>
                            <div className="w-[300px]">
                                <div className="relative w-full min-w-[200px] h-14">
                                    <input
                                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                                        placeholder=" "
                                        onChange={(e) => { setnewUserData({ ...newUserData, password: e.target.value }) }}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Password
                                    </label>
                                </div>
                                <span className="text-xs">{showpassAlert ? "Minimum length 12 & use a-z A-Z 0-9 !@#$%^&*?:" : ""}</span>
                            </div>

                        </div>
                        <div className="w-1/2 h-full flex flex-col gap-6">
                            <div className="w-[300px]">
                                <div className="relative w-full min-w-[200px] h-14">
                                    <input
                                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                                        placeholder=" "
                                        onChange={(e) => { setnewUserData({ ...newUserData, lastName: e.target.value }) }}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Last Name
                                    </label>
                                </div>
                            </div>
                            <div className="w-[300px]">
                                <div className="relative w-full min-w-[200px] h-14">
                                    <input
                                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                                        placeholder=" "
                                        onChange={(e) => { setnewUserData({ ...newUserData, cpassword: e.target.value }) }}
                                    />
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Confirm Password
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto">
                        <button onClick={handleFormSubmit} className="h-auto w-full flex justify-center items-center transition-all duration-300 hover:tracking-wider hover:text-lg p-2 text-white bg-red-500 rounded-md text-base font-light">{lodingState ? <ButtonLoding /> : "Added"}</button>
                    </div>

                </div>
            </div>
        </main>
    )
}