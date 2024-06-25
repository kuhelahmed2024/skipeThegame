import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { CheckPermission } from "@/src/helpers/checkPermision";
import { message } from "antd";

Connect()
interface DataType {
    key: string;
    name: string;
    email: string;
    rool: string;
    verify: object[];
    profile: any
}
export async function POST(req: NextRequest){

    const getCookies = req.cookies.get("Admin_Token")?.value
    if(!getCookies){
        return NextResponse.json({message: "You are Trying something else", status: 400})
    }
    const CheckResponse = await CheckPermission({cookie: getCookies})
    if(!CheckResponse.status){
        const resp = NextResponse.json({message: CheckResponse.message, status: 400})
        resp.cookies.set("Admin_Token", "", {expires: Date.now()})
        return resp
    }

    const findUser = await User.find({},{
        password: 0,
        loginToken: 0,
        lastActive: 0,
        createDate: 0,
    })

    return NextResponse.json({message: findUser, status: 200})

}