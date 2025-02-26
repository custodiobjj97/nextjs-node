"use client"
import { cookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";

type ParamsIdPost =  {
    id:string;
}

export default async function Button(props:ParamsIdPost){
    const id = props.id
    async function deletePosts(){
      const token =  cookieClient()
      const response = await api.delete(`/posts/${props.id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      }).catch((err) =>{
        console.log(err)
        return;
      })
    }

    return (
        <button onClick={deletePosts}>delete</button>
    )
}