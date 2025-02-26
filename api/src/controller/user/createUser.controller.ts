import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUser.service";



export const CreateUserController = async (req:Request, res:Response):Promise<void> => {
    try{
       const { name, email, password } = req.body;
       const userCreate = new CreateUserService()
       const user = await userCreate.execute({name,email,password})
       res.status(200).json(user)
    }catch(error){
     res.status(500).json({error:"Error to create user!"})
    }
}