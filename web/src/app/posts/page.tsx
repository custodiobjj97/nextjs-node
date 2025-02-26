"use client"
import React, { FormEventHandler } from "react";
import styles from "@/app/page.module.scss";
import { cookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";


interface Posts {
    id:string;
    title:string;
    content:string;
}

export default function Posts(){
    const [title,setTitle]=React.useState<string>("")
    const [content,setContent]=React.useState<string>("")
    const [data,setData]=React.useState<Posts[]>([])
    async function handlePosts(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        const token = cookieClient()
        const data={
            title,
            content
        }

        const response =await api.post('/posts',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log(response.data)
    }

    const fetchPosts = async()=>{
        const token = cookieClient()
        const response = await api.get('/posts',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        setData(response.data)
    }

    fetchPosts()


    async function deletePosts(id:string){
        const token = cookieClient()
        const response = await api.delete(`/posts/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log(response.data)
    }

    
    
    return (
        <section className={styles.containerSection}>
            <h1>Posts</h1>
            <form onSubmit={handlePosts}>
               <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your  title..."/>
               <input type="text" name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter your  content..."/>
               <button>send</button>
            </form>
            {data.map((item) =>(
                <div className={styles.post} key={item.id}>
                    <h2>{item.title}</h2>
                    <h4>{item.content}</h4>
                    <button onClick={() => deletePosts(item.id)}>delete</button>
                </div>
            ))}
        </section>
    )
}