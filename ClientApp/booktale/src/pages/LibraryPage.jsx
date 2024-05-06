import "./PagesCss.css";
import "./LibraryCss.css";
import ButtonMain from "../components/buttons/ButtonMainPage";
import BrownButton from "../components/buttons/BrownButton";

export default function Library() {
    return (
        <main className="container-main">
            <div className="header">
                <h1>Добро пожаловать в библиотеку, здесь вы можете опубликовать свой материал</h1>
                <div className="btn-library">
                   <ButtonMain text="Создать"/>
                   <BrownButton text="Мои записи"/>
                </div>
            </div>
        </main>
    )
}