import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/authUser.service";


export const AuthUserController = async (req:Request, res:Response):Promise<void> => {
    try{
      const { email, password } = req.body;
      const userAuth = new AuthUserService()
      const user = await userAuth.execute({ email, password })
      res.status(200).json(user)
    }catch(error){
      res.status(500).json({error:"Error to login!"})
    }
}