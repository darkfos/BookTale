import "./PagesCss.css";
import "./Profile.css";
import { Fragment } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import BtnProfile from "../components/buttons/ButtonForProfile";

export default function Profile() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="profile-info">
                    <div className="left-profile-info">
                        <img src="" alt="Фото профиля человека" />
                        <p></p>
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
                            <p>Количество публикаций</p>
                            <p>Количество отзывов</p>
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