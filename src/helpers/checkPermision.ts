import { Connect } from "@/src/db/db";
import User from "@/src/models/userModels";
import Jwt from "jsonwebtoken";
Connect()
export async function CheckPermission ({cookie }: { cookie: string }) {

    let ValideCookie
    try {
        const sss: any = Jwt.verify(cookie, process.env.SECRETKEY!)
        ValideCookie = sss
    } catch (error) {
        return {message: "You are not authorised", status: false}
    }
    if(!ValideCookie){
        return {message: "You are trying something else", status: false}
    }

    const findUser = await User.findOne({_id: ValideCookie.id, loginToken: ValideCookie.token})

    if(!findUser){
        return {message: "You are trying something else", status: false}
    }

    if(!findUser.accountStatus){
        return {message: "Your acccount id disabled", status: false}
    }

    return {message: findUser.rool, status: true, id: findUser._id}
}
