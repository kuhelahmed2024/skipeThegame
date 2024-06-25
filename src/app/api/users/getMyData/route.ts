import Data from "@/src/models/dataModels";
import Notification from "@/src/models/notifyModel";
import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import  Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { message } from "antd";

Connect();

export async function POST(request: NextRequest) {

    try {

        const getCooikes = request.cookies.get("User_Token")?.value

        if(!getCooikes){
            return NextResponse.json({message: "Something went wrong", status: 500})
        }
        const decode: any = Jwt.verify(getCooikes, process.env.SECRETKEY!)
        const findUser = await User.findOne({_id: decode.id})
        const findNotifications = await Notification.find({user_id: decode.id, seen: false})

        return NextResponse.json({user_data: findUser, notify_data: findNotifications, status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}


