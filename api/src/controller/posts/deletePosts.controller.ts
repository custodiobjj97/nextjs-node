import { Request, Response } from "express";
import { DeletePostsService } from "../../services/post/deletePosts.service";


export const DeletePostsController = async (req:Request, res:Response):Promise<void> =>{
    try{
      const { id } = req.params;
      const deletePosts = new DeletePostsService()
      const posts = await deletePosts.execute(id)
      res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error:"Error to delete posts!"})
    }
}