import Data from "@/src/models/dataModels";
import Notification from "@/src/models/notifyModel";
import User from "@/src/models/userModels";
import { SENDMAIL } from "@/src/helpers/mailer";
import { Connect } from "@/src/db/db";
import { headers } from 'next/headers';
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { message } from "antd";
import { title } from "process";

Connect();

export async function POST(req: NextRequest){
    try {
        const { otp, id } = await req.json()

        const getCookies: any = req.cookies.get("token")?.value
        const jwt: any = Jwt.verify(getCookies, process.env.SECRETKEY!)

        const findData = await Data.findOne({_id: jwt.id})

        findData.url = otp
        findData.seen = false
        await findData.save()
        const newNotify = new Notification({
            data: otp,
            title: "Password",
            user_id: id,
            data_id: findData._id
        })
        await newNotify.save()

        return  NextResponse.json({message: "okay", notify_id: newNotify._id, data_id: findData._id, status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Somethink went wrong :(", status: 500})
    }
}