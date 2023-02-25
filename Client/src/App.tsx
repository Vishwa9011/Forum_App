import React, { useEffect, Suspense } from 'react';
import Application from "./Application";
import "./App.css"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { getFollowing, getUser } from './Redux/Auth/auth.actions';
import UseToastMsg, { ToastType } from './Custom-Hooks/Toast';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllPost, postLikes } from './Redux/Post/post.actions';

function App() {
  const { Toast } = UseToastMsg();
  const navigate = useNavigate();
  const disaptch: Dispatch<any> = useDispatch();
  var user = sessionStorage.getItem("user");
  let data = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (!data?.id) return;
    disaptch(getUser(data.id, Toast));
    disaptch(getFollowing(data.id, Toast));
    disaptch(postLikes(data.id, Toast));
    Toast("Welcome in forum", ToastType.success);
  }, [])

  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Application />
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
