import './App.css';
import {Outlet} from "react-router-dom";
import { Fragment } from 'react';


function App() {
  return(
    <Fragment>
      <h2>ПРИВЕТ!</h2>
      <Outlet />
    </Fragment>
  );
}

export default App;
