import React from 'react'
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './Constants/constant';

function RequiredRoute(children: ReactNode) {
     const navigate = useNavigate()
     let user = JSON.parse(sessionStorage.getItem("user") || '');

     if (user == null) {
          return navigate("/login");
     }

     return (
          <>
               {children}
          </>
     )
}

export default RequiredRoute