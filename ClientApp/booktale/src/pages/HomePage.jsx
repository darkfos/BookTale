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
            <br></br>
            <br></br>
            <br />
            <br />
            <div className="content-1">
                <div className="content-1-left">
                    <img src={img_main_1} alt="Негр читает книгу" />
                </div>
                <div className="content-1-right">
                    <img src={img_main_2} alt="Женщина считает книги" />
                    <p>«Хорошо поставленное чтение спасает нас от всего, в том числе от самих себя… А если более буднично, то книга – убежище.»</p>
                </div>
            </div>
            <br />
            <br />        
            <div className="content-2">
                <div className="content-2-left">
                    <h3>во что мы верим</h3>
                </div>
                <div className="content-2-right">
                    <p>Мы верим прежде всего в человека, в его стремлении становиться лучше.</p>
                    <p>
                    Техническая, русская, испанская литература, неважно здесь вы найдете своё пристанище. Личный уголок где мы сможете уединиться и найти интересные для себя истории, материалы и просто хорошего друга в лице книги.
                    </p>
                    <p>Что мы часто забываем?</p>
                    <p>
                    С каждым десятилетием количество людей, которые предпочитают проводить свободное время с книгой всё уменьшается. Сами книги это двери в новый мир, мир в котором будет интересно познавать новое и самосовершенствоваться. Наш продукт предлагает людям развиваться и становиться лучше..
                    </p>
                </div>
            </div>
        </main>
        )
}