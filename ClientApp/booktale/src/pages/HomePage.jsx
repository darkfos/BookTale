import "./PagesCss.css";
import "./HomeCss.css";
import ButtonMain from "../components/buttons/ButtonMainPage";
import img_main_1 from "../static/main_photo_1.png";
import img_main_2 from "../static/main_photo_2.png";

export default function Home() {
    return (
        <main className="container-main">
            <div className="header">
                <h1>Ваша любимая библиотека теперь в браузере!</h1>
                <ButtonMain text="Найти книгу"/>
            </div>  
            <div className="content-1">
                <div className="content-1-left">
                    <img src={img_main_1} alt="Негр читает книгу" />
                </div>
                <div className="content-1-right">
                    <img src={img_main_2} alt="Женщина считает книги" />
                </div>
            </div>          
            <div className="content-2"></div>
        </main>
        )
}