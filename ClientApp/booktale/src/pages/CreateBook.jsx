import { Fragment } from "react";
import api from "../api";
import { Outlet } from "react-router-dom";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import CreateBook from "../components/buttons/ButtonCreateBook";
import "./PagesCss.css";
import "./createBook.css";
import "../components/buttons/ButtonMain.css";



export default function MyBooks() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <header>
                    <h1>Создание книги</h1>
                </header>
                <form action="" className="createBook">
                    <label for="title">Ваш заголовок</label>
                    <input type="text" placeholder="Заголовок" id="title"/>
                    <label for="description">Описание вашей книги</label>
                    <textarea name="" id="description" placeholder="Описание"></textarea>
                    <div className="btn-form">
                        <CreateBook text_1="Загрузить файл" text_2="Загрузить фотографию"/>
                    </div>
                    <br />
                    <br />
                    <button type="submit" className="btn-create-book" value='Создать'>Создать</button>
                </form>
            </main>
            <Footer />
            <Outlet />
        </Fragment>
    )
}