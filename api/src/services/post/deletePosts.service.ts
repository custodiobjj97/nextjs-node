import { prismaClient } from "../../db/prisma";


export class DeletePostsService {
    async execute(id: string){
        const posts = await prismaClient.post.delete({where:{id}})
        return posts
    }
}