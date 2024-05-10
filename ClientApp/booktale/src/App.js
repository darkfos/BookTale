// App.js
import {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Outlet, Navigate, useNavigate} from 'react-router-dom';
import Login from './pages/LoginPage';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices.js';
import useAuthUser from "./hooks/use-auth.js"
import api from './api.js';

function App() {

  const {isAuth, login, token, refresh_token} = useAuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const update_token = async () => {
    const req = await api.post("/auth/refresh-token", null, {
      withCredentials: true
    })
    
    if (req.status == "200") {
      dispatch(setUser({
        token: req.data.access_token,
        refresh_token: req.data.refresh_token
      }))
      navigate("/home");
    }
  }

  setInterval(() => update_token(), 240000); //Update in 4s - 240000000
  return isAuth ? (
    <Fragment>
      <Outlet />
    </Fragment>
  ) : (
    <Fragment>
      <Navigate to="/login" />
      <Outlet />
    </Fragment>
  )
}

export default App;