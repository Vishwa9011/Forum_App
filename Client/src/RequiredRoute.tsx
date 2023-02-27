import React from "react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IUser } from "./Constants/constant";
import { RootState } from "./Redux/store";

interface IChildren {
  children: ReactNode;
}

function RequiredRoute({ children }: IChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  var user = sessionStorage.getItem("user");
  let data = user ? JSON.parse(user) : null;
  const { userCredential } = useSelector((store: RootState) => store.auth);

  if (data == null) {
    return <Navigate to={"/login"} />
  }

  if (!userCredential.isVerified && location.pathname != '/sendverifyemail') {
    return <Navigate to={"/sendverifyemail"} />
  }

  if (location.pathname == '/sendverifyemail' && userCredential.isVerified) {
    return <Navigate to={'/'} />
  }

  return <>{children}</>;
}

export default RequiredRoute;
