import {getCookie} from "cookies-next"

export function cookieClient() {
    const token = getCookie("/user/login")
    return token
}