import User from "@/src/models/userModels";
import { Connect } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import { CheckPermission } from "@/src/helpers/checkPermision";

Connect()

export async function POST (req: NextRequest) {
    try {
        const { id } = await req.json()

        const getCookies = req.cookies.get("Admin_Token")?.value

        if(!getCookies){
            return NextResponse.json({message: "You are trying something wrong", status: 400})
        }
        const CheResponse: any = await CheckPermission({cookie: getCookies})
        if(!CheResponse.status){
            return NextResponse.json({message: CheResponse.message, status: 400})
        }

        if (CheResponse.message !== 0) {
            return NextResponse.json({ message: "You have not permission to do this work", status: 400 })
        }

        const findUse = await User.findById({_id: id})

        if(findUse.rool === 0){
            return NextResponse.json({ message: "This is Administrator account", status: 400 })
        }
        findUse.accountStatus = findUse.accountStatus ? false : true;
        await findUse.save()
        return NextResponse.json({message: `${findUse.firstName + " " + findUse.lastName} successfully ${findUse.accountStatus ? "Enable" : "Disable" }`, status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", status: 500})
    }
}