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
import { removeUser } from "../store/slices";



export default function Profile() {
    const [profiledata, setProfileData] = useState(null);
    const {login, token, refresh_token} = useAuthUser();
    const [img_profile, setImage] = useState(null);
    const dispatch = useDispatch();

    console.log(login, token, refresh_token);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await api.get("/user/profile-information", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                if (response.status === 200) {
                    setProfileData(response.data);
                    const photoData = response.data.photo_user;
                    const imageData = photoData.replace(/b'/g, '').replace(/'/g, ''); // Очистка от лишнего
                    var img = new Image();
                    img.src = "data:image/png;base64," + imageData;
                    setImage(img.src);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getProfileData();
    }, [token]);

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="profile-info">
                    <div className="left-profile-info">
                        <img src={img_profile} alt="Фото профиля человека" />
                        <p>{profiledata? profiledata.username : ""}</p>
                        <div className="btn-profile">
                            <BtnProfile text="Изменить имя" />
                            <BtnProfile text="Изменить фото" />
                            <button className="leaveBtn" onClick={(event) => {
                                dispatch(removeUser());
                            }}>Выйти из аккаунта</button>
                            <button className="delBtn">Удалить профиль</button>
                        </div>
                    </div>
                    <div className="right-profile-info">
                        <h2>Статистика</h2>
                        <div className="body-right-info">
                            <p>Количество публикаций: <span className="grn-text">{profiledata? profiledata.count_books : ""}</span></p>
                            <p>Количество отзывов: <span className="grn-text">{profiledata? profiledata.count_reviews : ""}</span></p>
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