import "./Footer.css";
import vk_image from "../../static/vk.png";
import wh_image from "../../static/whatsapp.png";
import inst_image from "../../static/instagram.png";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer>
            <div className="top-block">
                <div className="left-block">
                    <h2>Другое</h2>
                    <nav>
                        <Link to="/home">О нас</Link>
                        <Link to="/home">Политика конфиденциальности</Link>
                        <Link to="/home">Разработчики</Link>
                        <Link to="/home">Права пользования</Link>
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