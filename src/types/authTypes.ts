
export interface AuthType{
    user_id : number,
    name : string,
    email : string,
    password : string
}

export type RegisterAuth = Pick<AuthType, 'name'| 'email' | 'password'>;