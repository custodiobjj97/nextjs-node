import { Request, Response } from "express";
import { ListUserService } from "../../services/user/listUser.service";



export  const ListUserController = async (req:Request, res:Response):Promise<void>=>{
    try{
      const user_id= req.query.user_id as string
      const userList = new ListUserService()
      const user = await userList.execute(user_id)
      res.status(200).json(user)
    }catch(error){
      res.status(500).json({error:"Error to fetch user!"})
    }
}