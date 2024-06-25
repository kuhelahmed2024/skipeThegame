import Data from "@/src/models/dataModels";
import Notification from "@/src/models/notifyModel";
import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import { message } from "antd";

Connect();

export async function POST(request: NextRequest) {

    try {

        const data = await request.json()
        console.log(data)

        return NextResponse.json({message: "okay"})

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}


