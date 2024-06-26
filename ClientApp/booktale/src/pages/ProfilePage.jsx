import "./PagesCss.css";
import "./Profile.css";
import "../components/buttons/ButtonMain.css";
import Modal from "react-modal";
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
import { setUser } from "../store/slices";
import ChangeName from "../components/mod/changeName";
import ChangePhoto from "../components/mod/changePhoto";



export default function Profile() {
    const [profiledata, setProfileData] = useState(null);
    const {login, token, refresh_token} = useAuthUser();
    const [img_profile, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [model, setModel] = useState(false);
    const [model_update, setModelUpdate] = useState(null);

    const openModal = () => {
        setModel(true);
    }

    const closeModal= () => {
        setModel(false);
    }


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
            }
        }

        getProfileData();
    }, [token]);


    const deleteUser = async () => {
        const response = await api.delete("/user/delete_user", {
            headers: {
                Authorization: "Bearer " + token,
            }
        });

        if (response.status == "200") {
            dispatch(
                removeUser()
            );
        }
    }

    return (
        <Fragment>
            <Header />
            <main className="container-main">
                {model? 
                    <Modal isOpen={openModal} onRequestClose={closeModal} className="model">
                        {model_update == "name"? <ChangeName />:<ChangePhoto />}
                        <button onClick={closeModal} className="closeModel">Закрыть</button>
                    </Modal>    
                :
                <div className="profile-info">
                <div className="left-profile-info">
                    <img src={img_profile} alt="Фото профиля человека" />
                    <p>{profiledata? profiledata.username : ""}</p>
                    <div className="btn-profile">
                        <button className="btn-main" onClick={() => {
                            setModelUpdate("name");
                            openModal();
                        }}>Изменить имя</button>
                        <button className="btn-main" onClick={() => {
                            setModelUpdate("photo");
                            openModal();
                        }}>Изменить фото</button>
                        <button className="leaveBtn" onClick={(event) => {
                            dispatch(removeUser());
                        }}>Выйти из аккаунта</button>
                        <button className="delBtn" onClick={deleteUser}>Удалить профиль</button>
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
                            <BtnProfile text="Добавить книгу" navigate_page="/create_new_book"/>
                            <BtnProfile text="Мои книги" navigate_page="/my_books"/>
                        </div>
                    </div>
                </div>
            </div>}
            </main>
            <Footer />
        </Fragment>
    )
}