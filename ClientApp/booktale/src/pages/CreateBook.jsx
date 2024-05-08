import { Fragment } from "react";
import api from "../api";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import CreateBook from "../components/buttons/ButtonCreateBook";
import "./PagesCss.css";
import "./createBook.css";
import "../components/buttons/ButtonMain.css";



export default function MyBooks() {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);

    const createBook = async (event) => {
        event.preventDefault();
        console.log(title, description, photo, file);
        //const response = await api.post("/book/create_book");
    }

    const getBytePhoto = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            let byteArray = new Uint8Array(arrayBuffer);
            let base64String = btoa(String.fromCharCode.apply(null, byteArray)).toString();
            setPhoto(base64String);
        };
        reader.readAsArrayBuffer(file);
    }


    const getByteFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const base64String = arrayBufferToBase64(arrayBuffer);
            setFile(base64String);
        };
        reader.readAsArrayBuffer(file);
    }
    
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
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
                        <input type="file" accept=".docx, .pdf" onChange={getByteFile}/>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={getBytePhoto}/>
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