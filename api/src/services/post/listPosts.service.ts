import { prismaClient } from "../../db/prisma";

export class ListPostsService {
    async excute(){
        const listPosts = await prismaClient.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
            }
        })

        return listPosts
    }
}