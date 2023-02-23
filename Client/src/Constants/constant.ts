export interface IUser {
     _id: string
     username: string
     readonly email: string
     password: string
     gender: string
     online: boolean
     photoURL: string
     bio: string
     phoneNumber: number
     isVerified: boolean
     role: Role | null
     isGoogleAuthenticated: boolean
     readonly createdAt: number
     lastLogin: number
     token: string
     occupation: Occupation | null
}

export enum Occupation {
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

export interface LoginRes {
     status?: number,
     message: string,
     token: string
}

export interface RegisterResI {
     data: string
}

export interface IPost {
     _id: string
     title: string
     description: string
     content: string
     likes: ILikes[] | []
     comments: IComment[] | []
     author: IUser;
     authorID: string
     createdAt: number
     updateAt: number
     edited: boolean
     RootComments: IComment[] | []
     Replies: IComment[] | []
}


export interface IComment {
     _id: string
     message: string
     postID: string
     author: IUser
     authorID: string
     createdAt: number
     parent?: string
     parentID?: string
     child: IComment[] | []
     likes: ILikes[] | []
     edited: boolean
}

export interface ILikes {
     _id: string
     author: string
     authorID: string
}