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
    const [image_book, setImgBook] = useState(null);
    const [res, setRes] = useState(true);

    useEffect(() => {
        const req = async () => {
            const get_my_books = await api.get("/book/get-desc-book", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            
            if (get_my_books.status == "200") {
                setBooks(get_my_books.data);
            }
        }
        req();
    }, [token])

    const img_book = (book_data) => {
        const imageData = book_data.replace(/b'/g, '').replace(/'/g, ''); // Очистка от лишнего
        var img = new Image();
        img.src = "data:image/jpg;base64," + imageData;
        return img.src;
    }

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <h2>Мои книги</h2>
                {books?
                    books.map(book => (
                        <div className="book-info">
                            <img src={img_book(book.photo)} alt="Картинка книги" className="img-book"/>
                            <div className="about">
                                <h3>{book.title}</h3>
                                <p>{book.description}</p>
                                <p>Создатель: <span className="grn">{book.creator}</span></p>
                            </div>
                            <div className="btn-un-book">
                                <button>Удалить</button>
                                <button>Скачать</button>
                            </div>
                        </div>
                    ))
                    : ""}
            </main>
            <Footer />
            <Outlet />
        </Fragment>
    )
}