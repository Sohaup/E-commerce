import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth";

export async function middleware(request:NextRequest) {
    const tokenData = await getToken({req:request});
    const {pathname} = request.nextUrl;
    if (tokenData?.token) {
        if (pathname == "/login" || pathname == "/register") {
            return NextResponse.redirect(new URL("/" , request.url));
        }
    } else {
        if (pathname == "/cart" || pathname == "/orders") {
            return NextResponse.redirect(new URL("/login" , request.url) );
        }
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/cart" , "/orders" , "/login" , "/register"],
}