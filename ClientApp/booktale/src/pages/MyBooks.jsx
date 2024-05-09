import { Fragment } from "react";
import api from "../api";
import { Outlet } from "react-router-dom";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import "./PagesCss.css";
import { useState, useEffect } from "react";
import useAuthUser from "../hooks/use-auth";


export default function MyBooks() {
    const [books, setBooks] = useState(null);
    const {login, token, refresh_token} = useAuthUser();

    useEffect(() => {
        const req = async () => {
            const get_my_books = api.get("/book/get-information-about-book")
        }
    }, [token])

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <h2>Мои книги</h2>
                {books? ""
                : ""}
            </main>
            <Footer />
            <Outlet />
        </Fragment>
    )
}