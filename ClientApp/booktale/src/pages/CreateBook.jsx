import { Fragment } from "react";
import api from "../api";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import CreateBook from "../components/buttons/ButtonCreateBook";
import "./PagesCss.css";
import "./createBook.css";
import "../components/buttons/ButtonMain.css";
import useAuthUser from "../hooks/use-auth";



export default function MyBooks() {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const {login, token, refresh_token}= useAuthUser();

    const navigate = useNavigate();


    const createBook = async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.append("title", title);
        urlParams.append("description", description);


        console.log(title, description, photo, file);
        const response = await api.post("/book/create_book?title="+title+"&"+"description="+description, {
            "photo_book": photo,
            "file_data": file
        }, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.status == "201") {
            navigate("/home");
        }
    }

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <header>
                    <h1>Создание книги</h1>
                </header>
                <form action="" className="createBook" onSubmit={createBook}>
                    <label for="title">Ваш заголовок</label>
                    <input type="text" placeholder="Заголовок" id="title" onChange={(e) => {
                        setTitle(e.target.value);
                    }}/>
                    <label for="description">Описание вашей книги</label>
                    <textarea name="" id="description" placeholder="Описание" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    <div className="btn-form">
                        <input type="file" accept=".docx, .pdf" onChange={(e) => {
                            setFile(e.target.files[0])
                        }}/>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e) => {
                            setPhoto(e.target.files[0])
                        }}/>
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