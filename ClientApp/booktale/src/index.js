import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";


//Pages
import {Provider} from "react-redux"
import Home from './pages/HomePage';
import Library from './pages/LibraryPage';
import Profile from './pages/ProfilePage';
import Reviews from './pages/ReviewsPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreateBook from './pages/CreateBook.jsx';
import MyBooks from './pages/MyBooks.jsx';
import SearchBook from './pages/searchBook.jsx';
import {store} from "./store/index.js";


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/library",
        element: <Library />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/reviews",
        element: <Reviews />
      },
      {
        path: "/create_new_book",
        element: <CreateBook />
      },
      {
        path: "/my_books",
        element: <MyBooks />
      },
      {
        path: "/search-book",
        element: <SearchBook />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
