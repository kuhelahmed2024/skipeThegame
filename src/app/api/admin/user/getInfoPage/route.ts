import { NextResponse, NextRequest } from 'next/server';
import Data from '@/src/models/dataModels'
import Jwt  from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const getCookies = req.cookies.get("User_Token")?.value

    if(!getCookies){
        return NextResponse.json({status: 500})
    }

    const jwtToken: any = Jwt.verify(getCookies, process.env.SECRETKEY!)

    const data = await Data.find({user_id: jwtToken.id});
    
    return NextResponse.json({data: data, status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({status: 500});
  }
}
