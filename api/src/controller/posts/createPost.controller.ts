import { Request, Response } from "express";
import { CreatePostService } from "../../services/post/createPost.service";


export const CreatePostController = async (req:Request, res:Response):Promise<void> => {
    try{
       const { title, content } = req.body;
       const postCreate = new CreatePostService()
       const posts = await postCreate.execute({title, content})
       res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error:"Error to create posts!"})
    }
}