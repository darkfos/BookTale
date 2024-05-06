import './App.css';
import {Outlet, Navigate} from "react-router-dom";
import { Fragment } from 'react';

//Local components
import Header from './components/general/Header';
import Footer from './components/general/Footer';


//For auth user
// import Userfront, {
//   SignupForm,
//   LoginForm,
//   PasswordResetForm
// } from "@userfront/toolkit/react";

// Userfront.init("demo1234");

function App() {
  return(
    <Fragment>
      <Outlet />
      <Navigate to="/login"/>
    </Fragment>
  );
}

export default App;
