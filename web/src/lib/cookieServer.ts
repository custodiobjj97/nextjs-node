import { cookies } from "next/headers";

export async function getCookieServer():Promise<string | null>{
    const token = (await cookies()).get('/user/login')?.value
    return token || null
}