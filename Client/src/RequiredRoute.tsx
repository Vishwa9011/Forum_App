import React from 'react'
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './Constants/constant';


interface IChildren {
     children: ReactNode
}

function RequiredRoute({ children }: IChildren) {
     const navigate = useNavigate()

     var user = sessionStorage.getItem("user");
     let data = user ? JSON.parse(user) : null

     if (data == null) {
          navigate("/login")
     }

     return (
          <>
               {children}
          </>
     )
}

export default RequiredRoute