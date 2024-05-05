import './App.css';
import {Outlet} from "react-router-dom";
import { Fragment } from 'react';

//Local components
import Header from './components/general/Header';


function App() {
  return(
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
