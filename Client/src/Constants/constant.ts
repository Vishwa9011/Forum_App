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
}


export enum Role {
     ADMIN = "USER",
     USER = "USER"
}