import { prismaClient } from "../../db/prisma";


export class ListUserService {
    async execute(user_id:string){
        const user = await prismaClient.user.findFirst({where:{id:user_id}})

        return user
    }
}