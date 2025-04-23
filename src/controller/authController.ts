import { authMode } from "../model/authModel";
import { CookieOptions,Request,Response } from "express";
import { AuthType,RegisterAuth } from "../types/authTypes";
import { hasshedPassword,comparePassword,createToken } from "../services/AuthService";
import { authSchema } from "../schema/authSchema";

export const regiterUser = async (req: Request,res : Response): Promise<void> =>{
    try {
        const validar = authSchema.safeParse(req.body);
        if(!validar.success){
            res.status(400).json({errors : validar.error.errors});
            return
        }
        const {name,email,password}:RegisterAuth = validar.data;

        const buscarEmail = await authMode.getByEmail(email);

        if(buscarEmail){
            res.status(400).json({message : 'ya estas registrado'});
            return;
        }

        const hashearContra = await hasshedPassword(password);

        const user = await authMode.register({name,email,password:hashearContra});

        res.status(200).json({message:'usuario registrado',user})
    } catch (error: any) {
        res.status(500).json({
            message: "Error registrando el usuario",
            error: error.message,
          });
    }
}


export const login = async (req :Request,res: Response)=>{
    try {
        
    } catch (error) {
        
    }
}