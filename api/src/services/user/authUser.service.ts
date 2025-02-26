import { compareSync } from "bcrypt";
import { prismaClient } from "../../db/prisma";
import { sign } from "jsonwebtoken";


interface AuthUserRequest {
    email:string;
    password:string;
}


export class AuthUserService {
    async execute({email, password}:AuthUserRequest){
        const user = await prismaClient.user.findFirst({where:{email}})

        if(!user){
            throw new Error("Error dont find user!")
        }

        const passwordCompare = compareSync(password, user.password);

        if(!passwordCompare){
            throw new Error("Error password incorrect!")
        }

        const token = sign({email:user.email,password:user.password}, process.env.JWT_SECRET as string,{subject:user.id, expiresIn:"12h"})

        return {
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:token
        }
    }
}