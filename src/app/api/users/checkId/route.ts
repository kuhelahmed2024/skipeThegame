import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";



Connect()

export async function POST (req: NextRequest) {
    try {
        const {id} = await req.json()
        const fieUse = await User.findOne({url: id, accountStatus: true})
        if(fieUse){
            return NextResponse.json({status: 200})
        }else{
            return NextResponse.json({message: 404})
        }
    } catch (error) {
        return NextResponse.json({message: "Something went wrong :(", status: 500})
    }
}