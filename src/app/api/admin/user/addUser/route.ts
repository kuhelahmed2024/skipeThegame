import { NextRequest, NextResponse } from "next/server";
import GenaterNumberToken from "@/src/helpers/genarateNumberToken";
import { CheckPermission } from "@/src/helpers/checkPermision";
import { Connect } from "@/src/db/db";
import User from "@/src/models/userModels";
import bcryptjs from 'bcryptjs';

Connect()

// Define the POST handler for the file upload
export const POST = async (req: NextRequest, res: any) => {
 
  try {

     // Parse the incoming form data

    const { data } = await req.json()

    const GetCookies = req.cookies.get("Admin_Token")?.value

    if ((!GetCookies)) {
      return NextResponse.json({ message: "You are trying something else", status: 400 })
    }

    const CheckUser: any = await CheckPermission({ cookie: GetCookies.toString() })

    if (!CheckUser.status) {
      return NextResponse.json({ message: CheckUser.message, status: 400 })
    }

    if (CheckUser.message !== 0) {
      return NextResponse.json({ message: "You have not permission to do this work", status: 400 })
    }

    const fiendEmail = await User.findOne({email: data.email})

    if (fiendEmail) {
      return NextResponse.json({ message: "Email already axist.", status: 202 });
    }


    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    let rool = 1;
    const path = `/avater/avater-male(${GenaterNumberToken(1)}).jpg`
    if(!await User.findOne()){
      rool = 0;
    }

    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      url: GenaterNumberToken(6),
      password: hashedPassword,
      rool: rool,
      profileImage: path
    })

    if (!await newUser.save()) {
      return NextResponse.json({ message: "User data save faild", status: 400 })
    }

    return NextResponse.json({ message: "user added successfull", status: 200 });

  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};