import { Connect } from '@/src/db/db';
import User from '@/src/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import GenaterStringToken from '@/src/helpers/genarateStringToken';
import Check_Pass from '@/src/helpers/check-pass';
import Jwt from 'jsonwebtoken';
import { RateLimiter } from 'limiter';
import { useRouter } from 'next/router';

Connect();
const newLimiter = new RateLimiter({
    tokensPerInterval: 6,
    interval: "minute",
    fireImmediately: true
})

export async function POST(request: NextRequest) {

    try {

        const limiterResponse = await newLimiter.removeTokens(1)
        if(limiterResponse < 0){
            return NextResponse.json({ message: "Please try again two morroy", status: 400 })
        }

        const requestBody = await request.json();
        const { email, password } = requestBody;

        //Check email exist or not
        const fientEmail: any = await User.findOne({ email: email })
        if (!fientEmail) {
            return NextResponse.json({ message: "Wrong Email Address", status: 404 });
        };

        //check password match or not
        if (!Check_Pass({u_password: password, d_password: fientEmail.password})) {
            return NextResponse.json({ message: "Password doesn't match", status: 404 })
        }

        if (fientEmail.accountStatus === false) {
            return NextResponse.json({ message: "Your ID is Disabled", status: 404 });
        }

        const logintoken = GenaterStringToken(50);

        //token Data
        const adminToken = {
            id: fientEmail._id,
            token: logintoken,
        };

        fientEmail.loginToken = logintoken;
        await fientEmail.save();

        const MainToken = Jwt.sign(adminToken, process.env.SECRETKEY!, { expiresIn: "365d" });
        if(fientEmail.rool === 0){
            const response = NextResponse.json({
                message: "Login successfull",
                success: true,
                status: 200,
            });
            response.cookies.set("Admin_Token", MainToken, { expires: Date.now() + 365 * 24 * 60 * 60 * 1000, httpOnly: true });
            return response
        }else{
            const response = NextResponse.json({
                message: "Login successfull",
                success: true,
                status: 201,
            });
            response.cookies.set("User_Token", MainToken, { expires: Date.now() + 365 * 24 * 60 * 60 * 1000, httpOnly: true });
            return response
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}


