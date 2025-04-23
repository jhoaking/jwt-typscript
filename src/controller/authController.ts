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
    console.log(req.body);
    
    try {
        if(!email || !password){
              res.status(400).json({message : 'falta la contraseña y el email'});
              return;
             
        }

        const user = await authMode.getByEmail(email);

        if(!user){
             res.status(400).json({message : 'el email no esta registrado'})
             return;
        }

        const validarPassword = await comparePassword(password, user.password);
        if(!validarPassword){
             res.status(400).json({message : 'contraseña invalida'});
             return
        }

        const token = createToken(user);
        const options: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
          };
           
           res
          .status(200)
          .cookie('access_token',token,options)
          .json({message : 'login exitoso'})
        
    } catch (error: any) {
         res.status(500).json({
            message: "Error logeando el usuario",
            error: error.message,
          });
    }
}


export const protectedUser =  (req : Request , res : Response) =>{
    const user = req.user as AuthType;

    if(!user){
         res.status(401).json({message : 'usuario no autorizado'});
         return;
    }

      res.status(200).json({message: ' usuario autorizado' , user})
}

export const logout =  (_req: Request ,res : Response) =>{
      res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" })
     .status(200).json({ message: "Logout exitoso" });
}