import { hashSync } from "bcrypt";
import { prismaClient } from "../../db/prisma";

interface CreateRequest {
    name:string;
    email:string;
    password:string;
}

export class CreateUserService {
  async execute({name,email,password}:CreateRequest){
     const userFind = await prismaClient.user.findFirst({where:{email}});

     if(userFind) {
        throw new Error("Error user existis!")
     }


     const passwordHash = hashSync(password, 8)


     const user = await prismaClient.user.create({
        data:{
            name:name,
            email:email,
            password:passwordHash
        }
     })

     return user
  }
}