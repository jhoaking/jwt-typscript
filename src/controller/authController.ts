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
    const {email,password} = req.body;
    try {
        if(!email || !password){
           return  res.status(400).json({message : 'falta la contraseña y el email'});
        }

        const user = await authMode.getByEmail(email);

        if(!user){
           return  res.status(400).json({message : 'el email no esta registrado'})
        }

        const validarPassword = await comparePassword(password, user.password);
        if(!validarPassword){
            return res.status(400).json({message : 'contraseña invalida'});
        }

        const token = createToken(user);
        const options: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
          };
           
          return res
          .status(200)
          .cookie('access_token',token,options)
          .json({message : 'login exitoso'})
        
    } catch (error: any) {
       return  res.status(500).json({
            message: "Error logeando el usuario",
            error: error.message,
          });
    }
}


export const protectedUser =  (req : Request , res : Response) =>{
    const user = req.user as AuthType;

    if(!user){
        return res.status(401).json({message : 'usuario no autorizado'});
    }

     return res.status(200).json({message: ' usuario autorizado' , user})
}