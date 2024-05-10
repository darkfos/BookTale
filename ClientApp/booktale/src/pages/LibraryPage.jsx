import "./PagesCss.css";
import "./LibraryCss.css";
import ButtonMain from "../components/buttons/ButtonMainPage";
import BrownButton from "../components/buttons/BrownButton";
import LibraryImage from "../static/library.png";
import { Fragment } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";

export default function Library() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="header">
                    <h1>Добро пожаловать в библиотеку, здесь вы можете опубликовать свой материал</h1>
                    <div className="btn-library">
                    <ButtonMain text="Создать" nvg="/create_new_book"/>
                    <BrownButton text="Мои записи"/>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="library-main-container">
                    <img src={ LibraryImage } alt="Уный парень поясняет за книги" />
                    <p><span className="color-for-gr-text">Библиотеки</span> — гардеробы, из которых умелые люди могут извлекать  кое-что для украшения, многое — для любопытства и еще больше для  употребления. ( Дж.Дайер)</p>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}