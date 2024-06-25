import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";


Connect()

export async function POST (req: NextRequest) {
    try {
        const getCookies = req.cookies.get("User_Token")?.value
        const UserRool: Number[] = [0, 1]

        if(!getCookies){
            const ress = NextResponse.json({message: "You are trying something wrong", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }
        let vdl
        try {
            const ValideCookie: any = Jwt.verify(getCookies, process.env.SECRETKEY!)
            vdl = ValideCookie
        } catch (error) {
            const ress = NextResponse.json({message: "You are trying something else", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }
        if(!vdl){
            const ress = NextResponse.json({message: "You are trying something else", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }

        const findUser = await User.findOne({_id: vdl.id, loginToken: vdl.token})

        if(!findUser){
            const ress = NextResponse.json({message: "You are trying something else", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }

        if(!findUser.accountStatus){
            const ress = NextResponse.json({message: "Your acccount id disabled", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }

        if (!UserRool.includes(findUser.rool)) {
            const ress = NextResponse.json({message: "You have not permission to access this page", status: 400})
            ress.cookies.set("User_Token", "", {expires: Date.now()})
            return ress
        }
        return NextResponse.json({status: 200, id: findUser._id, url: findUser.url})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong :(", status: 500})
    }
}