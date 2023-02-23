import React from 'react'
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './Constants/constant';


interface IChildren {
     children: ReactNode
}

function RequiredRoute({ children }: IChildren) {
     const navigate = useNavigate()

     const sessionData = sessionStorage.getItem("user");
     console.log('sessionData: ', sessionData);

     if (sessionData == null) {
          sessionStorage.setItem("user", "")
          navigate("/login")
     }

     return (
          <>
               {children}
          </>
     )
}

export default RequiredRoute