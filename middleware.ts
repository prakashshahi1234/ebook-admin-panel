import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { Axios } from "./utils/axios";
import { cookies } from "next/headers";


export function middleware(request: NextRequest, event: NextFetchEvent) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // if (refreshToken && accessToken && process.env.JWT_ACCESS_SECRET) {


  // }


  // if logged in redirect to home page.
  // if (
  //   pathname.includes("/login") ||
  //   pathname.includes("/register") ||
  //   pathname.startsWith("/verify-email") ||
  //   pathname.startsWith("/forget-password")
  // ) {
  //   if (accessToken && refreshToken) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // // if user is not looged in.
  // if(pathname.startsWith("/")){
  // if(!accessToken && !refreshToken){
  //    return NextResponse.redirect(new URL("/login", request.url));
  // }
  // }
}
