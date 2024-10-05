"use client"
import axios from "axios"
import Image from "next/image"
import Eye from "@/public/icon/eye"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ButtonLoding from "@/public/icon/loding"
import Closs_eye from "@/public/icon/closs_eye"
import GoogleImage from "@/public/image/google.png"
import FacebookImage from "@/public/image/facebook.png"
import LoginDummiImage from "@/public/image/login-dummi-image.jpg"


import 'react-toastify/dist/ReactToastify.css';
import InfoToast from "@/src/components/toast/InfoToast"
import { Bounce, ToastContainer, toast } from 'react-toastify'
import WarningToast from "@/src/components/toast/WarningToast"

export default function Login() {
    const route = useRouter()
    const [passwordSee, setPasswordSee] = useState(false)
    const [Loding, setLoding] = useState(false)

    const [EmailAndUserName, setEmailAndUserName] = useState("")
    const [Password, setPassword] = useState("")

    const handleLogin = async () => {

        if (Loding) {
            InfoToast({ message: "Your request is procesing" })
            return
        }

        if (EmailAndUserName === "" || Password === "") {
            InfoToast({ message: "Please provide your information" })
            return
        }
        setLoding(true)
        const toastId = toast.loading("Please wait request is processing", {
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
        try {
            const response = await axios.post("/api/users/login", { email: EmailAndUserName, password: Password })

            setLoding(false)
            const status = response.data.status
            const message = response.data.message
            if (status === 500) {
                toast.update(toastId, { render: message, type: "error", isLoading: false })
                return
            } else if (status === 404) {
                toast.update(toastId, { render: message, type: "info", isLoading: false })
                // Wrong Email or Username
                return
            } else if (status === 400) {
                toast.update(toastId, { render: message, type: "info", isLoading: false })
                // Password doesn't match
                return
            } else if (status === 201) {
                toast.update(toastId, { render: message, type: "success", isLoading: false })
                setTimeout(() => {
                    route.push("/controlers/user")
                }, 1500)
                return
            } else if (status === 200) {
                toast.update(toastId, { render: message, type: "success", isLoading: false })
                setTimeout(() => {
                    route.push("/controlers/admin")
                }, 1500)
                return
                return
            }
        } catch (error) {
            toast.update(toastId, { render: "Something went wrong", type: "error", isLoading: false })
        }


    }

    return (
        <main className={`w-[100vw] h-[100vh] flex flex-col gap-9 bg-slate-100 p-20 justify-center items-center`}>
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
            <div className="pc:w-[60vw] w-[90vw] h-[60vh] flex rounded-lg shadow-lg">
                <div className="w-1/2 h-full bg-white hidden pc:flex rounded-l-lg">
                    <Image className="w-auto h-full rounded-l-lg" placeholder="blur" quality={100} src={LoginDummiImage} alt="Login Dummi Image" />
                </div>

                <div className="w-full pc:w-1/2 h-full bg-white gap-6 rounded-r-lg p-10 flex flex-col">
                    <div className="flex w-full h-auto gap-2 flex-col justify-center items-center text-center text-black">
                        <h1 className="text-2xl font-extrabold text-black">Login</h1>
                        <p className="text-xs text-gray-500">You should Login you account becaouse We do not know Who are you..?</p>
                    </div>
                    <div className="w-full h-auto flex flex-col gap-3">
                        <div className="w-full h-auto relative">
                            <input
                                onChange={(e) => { setEmailAndUserName(e.target.value) }}
                                type="text"
                                value={EmailAndUserName}
                                placeholder="Email & Username"
                                className="bg-slate-200 rounded-lg p-3 w-full text-slate-600 h-12 border-none outline-none"
                            />
                        </div>
                        <div className="w-full h-auto relative">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={passwordSee ? "text" : "password"}
                                value={Password}
                                placeholder="Password"
                                className="bg-slate-200 rounded-lg p-3 w-full text-slate-600 h-12 border-none outline-none"
                            />
                            {
                                passwordSee ?
                                    <Eye onClick={() => { setPasswordSee(false) }} className={`absolute top-3 right-5`} style={{ height: "25px", width: "25px" }} />
                                    :
                                    <Closs_eye onClick={() => { setPasswordSee(true) }} className={`absolute top-3 right-5`} style={{ height: "25px", width: "25px" }} />
                            }
                        </div>
                        <div className="w-full h-auto text-right">
                            {/* <Link href={"/forgetPassword"}>
                                        <span className="text-sm text-slate-700 hover:text-red-500 hover:underline decoration-red-500 hover:text-base cursor-pointer transition-all duration-150">
                                            Forget Pass !
                                        </span>
                                </Link> */}
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                        <button onClick={handleLogin} className="w-full flex justify-center items-center bg-red-500 rounded-md hover:tracking-widest hover:font-bold text-white p-3 text-lg hover:text-xl transition-all duration-150">
                            {Loding ? <ButtonLoding /> : "Login"}
                        </button>
                        {/* <div className="flex w-auto h-auto text-xs gap-2">
                            <p className="text-black">Do you have a previose account ?</p>
                            <Link href={"/sinup"}>
                                <span className="text-red-500 cursor-pointer hover:text-sm transition-all duration-150">Sin up</span>
                            </Link>
                        </div> */}
                    </div>
                </div>

            </div>
            <div className="w-[60vw] h-auto flex gap-5 justify-center items-center before:w-8 before:h-1 before:rounded-xl before:bg-slate-500 after:w-8 after:h-1 after:rounded-xl after:bg-slate-500">
                <div className="w-10 rounded-full shadow-lg h-10 relative transition-all duration-200 hover:-mt-5 cursor-pointer">
                    <Image src={GoogleImage} alt="Google Logo" />
                </div>
                <div className="w-10 rounded-full shadow-lg h-10 relative transition-all duration-200 hover:-mt-5 cursor-pointer">
                    <Image src={FacebookImage} alt="Google Logo" />
                </div>
            </div>
        </main>
    )
}