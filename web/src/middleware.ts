import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import { api } from "./services/api";


export default async function middleware(req:NextRequest){
    const  { pathname } = req.nextUrl;

    if(pathname.startsWith('/_next') || pathname === "/") {
        return NextResponse.next()
    }

    const token = await getCookieServer();

    if(pathname.startsWith('/posts')) {
      if(!token){
        return NextResponse.redirect(new URL("/", req.url))
      }

      const isValid = await valideToken(token)

      if(!isValid) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return NextResponse.next()
}


async function valideToken(token:string) {
    if(!token) return false 

    try{
      await api.get('/user/me',{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })

      return true
    }catch(error){
      console.log(error)
      return false
    }
}