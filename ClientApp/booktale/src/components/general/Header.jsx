import {useNavigate, Outlet} from "react-router-dom";
import "./Header.css";

export default function Header() {
    const navigate_site = useNavigate();

    return (
        <header>
            <div className="logo">
                <a href="/">BookTale</a>
            </div>
            <nav className="">
                <a href="/home">Главная</a>
                <a href="/library">Библиотека</a>
                <a href="/reviews">Отзывы</a>
                <a href="/profile">Мой профиль</a>
                <button onClick={() => {
                    navigate_site("/search");
                }} className="btn_search">Поиск</button>
            </nav>
            <Outlet />
        </header>
    )
}