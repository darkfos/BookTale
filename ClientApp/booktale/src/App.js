// App.js
import {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Outlet, Navigate} from 'react-router-dom';
import Login from './pages/LoginPage';
import { useDispatch } from 'react-redux';
import useAuthUser from "./hooks/use-auth.js"

function App() {
  return useAuthUser ? (
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