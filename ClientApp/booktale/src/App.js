import './App.css';
import {Outlet} from "react-router-dom";
import { Fragment } from 'react';

//Local components
import Header from './components/general/Header';
import Footer from './components/general/Footer';


function App() {
  return(
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default App;
