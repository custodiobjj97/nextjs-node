import { Request, Response } from "express";
import { ListPostsService } from "../../services/post/listPosts.service";


export const ListPostsController = async (req:Request, res:Response):Promise<void> =>{
    try{
      const listPosts = new ListPostsService()
      const posts = await listPosts.excute()
      res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error:"Error to fetch list posts!"})
    }
}