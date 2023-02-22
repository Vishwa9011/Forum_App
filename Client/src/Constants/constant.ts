export interface IUser {
     username: string
     readonly email: string
     password: string
     gender: string
     online: boolean
     photoURL: string
     phoneNumber: number
     isVerified: boolean
     role: Role | null
     isGoogleAuthenticated: boolean
     readonly createdAt: number
     lastLogin: number
     token: string
     occupation:Occupation | null
     bio: string
}

export enum Occupation{
     STUDENT = "STUDENT",
     ENGINEER = "ENGINEER"  
}

export enum Role {
     ADMIN = "USER",
     USER = "USER"
}


export interface UserI {
     username: string,
     email: string,
     password: string,
}

export interface ProcessEnv {
     BASE_URL: string
     NODE_ENV: 'development' | 'production';
}

export interface LoginCred {
     email: string,
     password: string
}

export interface LoginRes {
     status?: number,
     message: string,
     token: string
}

export interface RegisterResI {
     data: string
}
