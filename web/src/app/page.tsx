import { api } from "@/services/api";
import styles from "./page.module.scss";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData:FormData){
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if(email === "" || password === ""){
      console.log("PREENCHA OS CAMPOS")
      return;
    }

    try{
      const response = await api.post('/user/login',{
        email,
        password
      })

      const token = response.data.token 
      console.log(token)
      if(!token) return;

      const cookieToken = await cookies();
      const expriseTime = 24 * 60 * 60 * 30 * 1000
      cookieToken.set('/user/login',token,{
        maxAge:expriseTime,
        path:"/",
        httpOnly:false,
        secure:process.env.NODE_ENV === "production"
      })

    }catch(error){
      console.log(error)
      return;
    }

    redirect('/posts')

  }
  return (
    <section className={styles.containerSection}>
      <h1>Login</h1>
      <form action={handleLogin}>
        <input type="email" 
        name="email" 
        placeholder="Enter your email...."/>
        <input 
        type="password" 
        name="password"
        placeholder="Enter your password...."/>
        <button type="submit">Send</button>
      </form>
      <Link className={styles.link} href="/signup">If you dont have account ? <br/> 
      please click here!</Link>
    </section>
  );
}
