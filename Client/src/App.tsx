import React, { useEffect, Suspense } from 'react';
import Application from "./Application";
import "./App.css"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { getFollowing, getUser } from './Redux/Auth/auth.actions';
import UseToastMsg, { ToastType } from './Custom-Hooks/Toast';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllPost, postLikes } from './Redux/Post/post.actions';
import Loader from './Components/Loader/Loader';

function App() {
  const { Toast } = UseToastMsg();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  var user = sessionStorage.getItem("user");
  let data = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (!data?.id) return;
    dispatch(getUser(data.id, Toast));
    dispatch(getFollowing(data.id, Toast));
    dispatch(postLikes(data.id));
    Toast("Welcome in forum", ToastType.success);
  }, [])

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Application />
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
