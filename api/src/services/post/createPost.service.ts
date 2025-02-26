import { prismaClient } from "../../db/prisma";

interface CreatePostRequest {
    title:string;
    content:string;
}


export class CreatePostService {
    async execute({title,content}:CreatePostRequest){
        const posts = await prismaClient.post.create({
            data:{
                title,
                content
            }
        })

        return posts
    }
}