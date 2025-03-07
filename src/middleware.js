import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // console.log("FROM MIDDELWARE: ", request.nextUrl.pathname)
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/my-bookings",
        "/my-bookings/:path*",
        "/services",
        "/services/:path*"
    ]
}