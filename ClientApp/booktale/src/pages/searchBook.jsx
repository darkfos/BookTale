import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/use-auth";
import "./PagesCss.css";
import api from "../api";
import { Fragment } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";

export default function SearchBook() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="find-book">
                    <input type="text" placeholder="Название книги"/>
                    <button>Найти</button>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}