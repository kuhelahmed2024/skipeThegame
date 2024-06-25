import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const UserToken = req.cookies.get("User_Token")?.value
        const AdminToken = req.cookies.get("Admin_Token")?.value

        if(UserToken){
            const response = NextResponse.json({ message: "log out successful", status: 200 })
            response.cookies.set('User_Token', "", { expires: new Date(0)})
            return response;
        }else{
            const response = NextResponse.json({ message: "log out successful", status: 200 })
            response.cookies.set('Admin_Token', "", { expires: new Date(0)})
            return response;
        }
    } catch (error) {
        return NextResponse.json({message: "log out faild", status: 500})
    }

}