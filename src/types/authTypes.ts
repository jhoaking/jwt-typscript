
export interface AuthType{
    user_id : number,
    name : string,
    email : string,
    passsword : string
}

export type RegisterAuth = Pick<AuthType, 'name'| 'email' | 'passsword'>;