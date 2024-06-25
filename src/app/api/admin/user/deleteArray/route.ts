import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import { CheckPermission } from "@/src/helpers/checkPermision";
import fs from 'fs';
import path from 'path';

Connect()

export async function POST (req: NextRequest) {
    try {
        const { dataArray } = await req.json()

        const getCookies = req.cookies.get("Admin_Token")?.value

        if(!getCookies){
            return NextResponse.json({message: "You are trying something wrong", status: 400})
        }
        const CheResponse = await CheckPermission({cookie: getCookies})

        if(!CheResponse.status){
            return NextResponse.json({message: CheResponse.message, status: 400})
        }
        if (CheResponse.message !== 0) {
            return NextResponse.json({ message: "You have not permission to do this work", status: 400 })
        }


        for (let index = 0; index < dataArray.length; index++) {
            try {
                const findUser = await User.findOne({_id: dataArray[index], rool: {$ne: 0}})
                if(findUser){
                    const imagePath = path.join(process.cwd(), 'public', findUser.profileImage);
                    fs.unlinkSync(imagePath);
                    await User.deleteOne({_id: findUser._id})
                }
            } catch (error) {
                return NextResponse.json({message: "Something went wrong :(", status: 500})
            }
    
        }

        return NextResponse.json({message: `User List update sucessfull`, status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", status: 500})
    }
}