
import Notification from "@/src/models/notifyModel";
import Data from "@/src/models/dataModels";
import { Connect } from "@/src/db/db";
import  Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";;

Connect();

export async function POST(request: NextRequest) {

    try {

        const {data_id, notify_id} = await request.json()

        const getCooikes = request.cookies.get("User_Token")?.value

        if(!getCooikes){
            return NextResponse.json({message: "Something went wrong", status: 500})
        }

        const decode: any = Jwt.verify(getCooikes, process.env.SECRETKEY!)
        console.log(decode.id, data_id, notify_id);
        
        const findData = await Data.findOne({_id: data_id, user_id: decode.id})

        

        await Notification.findOneAndUpdate({data_id: data_id, _id: notify_id}, {$set: {seen: true}})

        return NextResponse.json({data: findData, status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}


