import bcrypt from 'bcrypt';
import jwt,{JwtPayload} from 'jsonwebtoken';
import { SECRET_JWT_KEY,SALT_ROUNDS } from '../config';
import { AuthType } from '../types/authTypes';


export const hasshedPassword = async (passsword : string): Promise<string> =>{
    try {
        const hashed = await bcrypt.hash(passsword, Number(SALT_ROUNDS));
        return hashed;
    } catch (error : any) {
        throw new Error("error al hashear la password");
    }
}

export const comparePassword = async (passswordNoHashed : string , hashedPassword : string): Promise<boolean> =>{
    try {
        const compare =  await bcrypt.compare(passswordNoHashed, hashedPassword);
        return compare;
    } catch (error: any) {
        throw new Error("error al comparar las passwords");
    }
}

export const createToken =  (user : AuthType):string =>{
    try {
        const token = jwt.sign(
            {user_id : user.user_id, name : user.name,email : user.email},
            SECRET_JWT_KEY,
            {expiresIn : '48h'}
        )
        return token;
    } catch (error: any) {
        throw new Error("error al crear el token");
    }
}

export const verifyToken = (token:string): string | JwtPayload  =>{
    try {
        const verify = jwt.verify(token,SECRET_JWT_KEY);
        return verify;
    } catch (error : any) {
        throw new Error("erorr al hashear la password");
    }
}