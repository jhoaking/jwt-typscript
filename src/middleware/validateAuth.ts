import { Request,Response,NextFunction } from "express";
import { SECRET_JWT_KEY } from "../config";
import { AuthType } from "../types/authTypes";
import  jwt  from "jsonwebtoken";

export const validateAuth = async (req:Request & {user?:AuthType}, res : Response , next : NextFunction) =>{
    try {
        const token = req.cookies.access_token;
        if(!token){
            return res.status(400).json({message : 'el token no e encontro'});
        }

        const decoded = jwt.verify(token,SECRET_JWT_KEY) as AuthType;

        req.user = decoded;
        next();
        return;
    } catch (error: any) {
        return  res.status(500).json({message: 'no se vaido el token'})
    }
}