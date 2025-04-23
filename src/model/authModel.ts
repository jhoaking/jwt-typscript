import { ResultSetHeader,RowDataPacket } from 'mysql2';
import {pool} from '../db';
import { AuthType, RegisterAuth } from '../types/authTypes';

export class authMode{
    static  register = async (data : RegisterAuth):Promise<AuthType> =>{
        
        const query = 'INSERT INTO usuarios(name,email,password) VALUES(?,?,?)';
        const values = [data.name,data.email,data.password];
        const [rows] =  await pool.query<ResultSetHeader>(query,values);
        return {user_id : rows.insertId , ...data} 
    }

    static getByEmail = async (email : string): Promise<AuthType | null> =>{
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await pool.query<RowDataPacket[]>(query,[email]);

        if(rows.length === 0){
            return null;
        }
        return rows[0] as AuthType;
    }
}
