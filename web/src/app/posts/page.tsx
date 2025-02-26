import styles from "@/app/page.module.scss"
import Button from "@/components/delete";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

interface Posts {
    id:string;
    title:string;
    content:string;
}



export default async function Posts(){
   
    async function handlePosts(formData:FormData){
        "use server"

        const title = formData.get("title")
        const content = formData.get("content")

        if(title === "" || content === "") {
            return;
        }

        const data = {
            title:title,
            content:content
        }

        const token = await getCookieServer();

        await api.post("/posts",data,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).catch((err)=>{
            console.log(err)
            return;
        })
        
        
        
    }

    

    const token = await getCookieServer()

    const listPosts = await api.get('/posts',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    
    
   



    return (
        <section className={styles.containerSection}>
            <h1>Home</h1>

            <form action={handlePosts}>
              <input type="text" 
              name="title" 
              placeholder="Enter your title..."/>
              <input type="text" 
              name="content" 
              placeholder="Enter your content..."/>
              <button>Send</button>
              
            </form>

            {listPosts.data.map((item:Posts) =>{
            return <>
                <div className={styles.post} key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <Button id={item.id}/>
            </div>
            </>
           })}

            
           
           
        </section>
    )
}