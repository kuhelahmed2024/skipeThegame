import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const Admin_Token = request.cookies.get("Admin_Token")?.value;
    const User_Token = request.cookies.get("User_Token")?.value;
    const newRagex = new RegExp("/controlers/*")

    if (path === "/controlers/admin" && !Admin_Token) {
        return NextResponse.redirect(new URL("/controlers", request.nextUrl));
    } else if(path === "/controlers/user" && !User_Token){
        return NextResponse.redirect(new URL("/controlers", request.nextUrl));
    } else if(path === "/controlers" && Admin_Token){
        return NextResponse.redirect(new URL("/controlers/admin", request.nextUrl));
    } else if (path === "/controlers" && User_Token){
        return NextResponse.redirect(new URL("/controlers/user", request.nextUrl));
    }else {
        NextResponse.next()
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/controlers/:path*",
    ],
}