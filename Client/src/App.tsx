import React, { useEffect } from 'react';
import Application from "./Application";
import "./App.css"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { getUser } from './Redux/Auth/auth.actions';
import UseToastMsg, { ToastType } from './Custom-Hooks/Toast';
import { useNavigate } from 'react-router-dom';

function App() {
  const { Toast } = UseToastMsg();
  const navigate = useNavigate();
  const disaptch: Dispatch<any> = useDispatch();
  var user = sessionStorage.getItem("user");
  let data = user ? JSON.parse(user) : null
  useEffect(() => {
    if (!data?.id) return
    disaptch(getUser(data.id, Toast))
    Toast("Welcome in forum", ToastType.success);
  }, [])

  return (
    <>
      <Application />
    </>
  );
}

export default App;
