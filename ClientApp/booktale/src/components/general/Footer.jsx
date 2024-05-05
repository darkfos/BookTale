import "./Footer.css";
import vk_image from "../../static/vk.png";
import wh_image from "../../static/whatsapp.png";
import inst_image from "../../static/instagram.png";


export default function Footer() {
    return (
        <footer>
            <div className="top-block">
                <div className="left-block">
                    <h2>Другое</h2>
                    <nav>
                        <a href="/">О нас</a>
                        <a href="/">Политика конфиденциальности</a>
                        <a href="/">Разработчики</a>
                        <a href="/">Права пользования</a>
                    </nav>
                </div>
                <div className="right-block">
                    <h2>Наши контакты</h2>
                    <div className="img-contact">
                        <img src={wh_image} alt="Ватсап" />
                        <img src={vk_image} alt="Вконтакте" />
                        <img src={inst_image} alt="Ватсап" />
                    </div>
                </div>
            </div>
            <div className="bottom-block">
                <p>Все права защищены</p>
            </div>
        </footer>
    )
}