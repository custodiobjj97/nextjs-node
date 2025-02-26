import styles from "@/app/page.module.scss"
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function SignUp(){
    async function handleSignUp(formData:FormData){
        "use server"
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password")

        if(name === "" || email === "" || password === ""){
            console.log("PREENCHA OS CAMPOS!")
            return;
        }

        await api.post("/user/signup",{
            name,
            email,
            password
        }).catch((err)=>{
            console.log(err)
            return;
        })
       
        redirect("/")
    }
    return (
        <section className={styles.containerSection}>
            <h1>Sign Up</h1>
            <form action={handleSignUp}>
            <input type="text" 
            name="name" 
            placeholder="Enter your name...."/>
            <input type="email" 
             name="email" 
             placeholder="Enter your email...."/>
           <input 
            type="password" 
            name="password"
            placeholder="Enter your password...."/>
            <button type="submit">register</button>
            </form>
        </section>
    )
}