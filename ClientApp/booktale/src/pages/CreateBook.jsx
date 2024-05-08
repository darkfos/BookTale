import { Fragment } from "react";
import api from "../api";
import { Outlet } from "react-router-dom";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import "./PagesCss.css";



export default function MyBooks() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <h2>Создание книги</h2>
            </main>
            <Footer />
            <Outlet />
        </Fragment>
    )
}