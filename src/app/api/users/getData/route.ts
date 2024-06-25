import Data from "@/src/models/dataModels";
import { Connect } from "@/src/db/db";
import  Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {

    try {

        const { id } = await request.json()

        const getCooikes = request.cookies.get("User_Token")?.value

        if(!getCooikes){
            return NextResponse.json({message: "Something went wrong", status: 500})
        }
        const decode: any = Jwt.verify(getCooikes, process.env.SECRETKEY!)
        const findData = await Data.findOne({_id: id })

        if(!findData){
            return NextResponse.json({message: "Something went wrong", status: 500})
        }

        return NextResponse.json({getdata: findData, status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}


