export interface UserI{
    name : string,
    email : string,
    password : string,
    gender : string
}

export interface ProcessEnv {
    BASE_URL : string
    NODE_ENV: 'development' | 'production';
  }

  export interface LoginCred{
    email:string,
    password:string
  }

  export interface LoginRes{
    status?:number,
    message:string,
    token:string
  }

  export interface RegisterResI {
    data:string
  }
