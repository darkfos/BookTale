import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthUser from "../hooks/use-auth";
import "./PagesCss.css";
import api from "../api";
import { Fragment } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";

function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}


export default function SearchBook() {
    const [book, setBook] = useState(null);
    const [allbooks, setAllBooks] = useState(null);
    const [image, setImage] = useState(null);

    const {login, token, refresh_token} = useAuthUser();

    const find_books = async () => {
        try {
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
        } catch {
            setBook(null);
        }
    }

    const image_book = async (data) => {
        const imageData = data.replace(/b'/g, '').replace(/'/g, ''); // Очистка от лишнего
        var img = new Image();
        img.src = "data:image/png;base64," + imageData;
        setImage(img.src);
    }

    const download_book = async (id_book) => {
        const req = await api.get("/book/download-id-book", {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                "book_id": id_book
            }
        })
        console.log(req)
        if (req.status == 200) {
            const arrayBuffer = stringToUint8Array(req.data);
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
            const fileUrl = URL.createObjectURL(blob);
            const fileName = "Книга.pdf";
    
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
    
            URL.revokeObjectURL(fileUrl);
            document.body.removeChild(link);
        }
    }


    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="find-book">
                    <input type="text" placeholder="Название книги" onChange={(e) => {
                        setBook(e.target.value)
                    }}/>
                    <button onClick={(e) => {
                        find_books();
                    }}>Найти</button>
                </div>
                {allbooks? 
                allbooks.map(bk => (
                    <div className="bk-unique">
                        <img src={() => {
                            image_book(bk.photo)
                            return image
                        }} alt="Изображение картинки"/>
                        <div className="info">
                            <h3>{bk.title}</h3>
                            <p>{bk.description}</p>
                            <p>Создатель: <span className="grn">{bk.creator}</span></p>
                            <button value={bk.id_book} onClick={(e) => {
                                download_book(e.target.value)
                            }}>Скачать</button>
                        </div>
                    </div>
                ))
                :
                <p className="lineMessage">Записи не были найдены</p>    
            }
            </main>
            <Footer />
        </Fragment>
    )
}