import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthUser from "../hooks/use-auth";
import "./PagesCss.css";
import api from "../api";
import { Fragment } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";


export default function SearchBook() {
    const [book, setBook] = useState(null);
    const [allbooks, setAllBooks] = useState(null);

    const {login, token, refresh_token} = useAuthUser();

    const find_books = async () => {
        const req = await api.get("/book/find-by-title", {
            headers: {
                Authorization: "Bearer " + token
            },
            params: {
                "title": book
            }
        })

        if (req.status == "200") {
            setAllBooks(req.data);
        }
    }
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="find-book">
                    <input type="text" placeholder="Название книги"/>
                    <button onClick={(e) => {
                        setBook(e.target.value)
                    }}>Найти</button>
                </div>
                {book? 
                book.map(bk => {
                    <div className="bk-unique">
                        <h3>{bk.title}</h3>
                        <p>{bk.description}</p>
                    </div>
                })
                :
                <p className="lineMessage">Записи не были найдены</p>    
            }
            </main>
            <Footer />
        </Fragment>
    )
}