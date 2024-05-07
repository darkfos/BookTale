import "./PagesCss.css";
import "./Profile.css";
import { Fragment } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import BtnProfile from "../components/buttons/ButtonForProfile";
import api from "../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthUser from "../hooks/use-auth";



export default function Profile() {
    const [profiledata, setProfileData] = useState(null);
    const {login, token, refresh_token} = useAuthUser;

    const getProfileData = async () => {
        const response = await api.get("/user/profile-information", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log("dasdasd")
        if (response.status == "200") {
            setProfileData(response.data);
        }
    }

    //Вызов функции
    getProfileData();

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="profile-info">
                    <div className="left-profile-info">
                        <img src="" alt="Фото профиля человека" />
                        <p>{profiledata.username}</p>
                        <div className="btn-profile">
                            <BtnProfile text="Изменить имя" />
                            <BtnProfile text="Изменить фото" />
                            <BtnProfile text="Выйти из аккаунта" />
                            <BtnProfile text="Удалить профиль" />
                        </div>
                    </div>
                    <div className="right-profile-info">
                        <h2>Статистика</h2>
                        <div className="body-right-info">
                            <p>Количество публикаций {profiledata.count_books}</p>
                            <p>Количество отзывов {profiledata.count_reviews}</p>
                        </div>
                        <div className="body-right-footer">
                            <h3>Мои книги</h3>
                            <div className="btn-profile-books">
                                <BtnProfile text="Добавить книгу" />
                                <BtnProfile text="Мои книги" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}