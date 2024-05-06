import "./PagesCss.css";
import ButtonMain from "../components/buttons/ButtonMainPage";

export default function Home() {
    return (
            <main className="container-main">
                <div className="header">
                    <h1>Ваша любимая библиотека теперь в браузере!</h1>
                    <ButtonMain text="Найти книгу"/>
                </div>            
            </main>
        )
}