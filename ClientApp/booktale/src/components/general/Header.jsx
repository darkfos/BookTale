import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate_site = useNavigate();

    return (
        <header>
            <nav className="">
                <a href="/">Главная</a>
                <a href="/library">Библиотека</a>
                <a href="/reviews">Отзывы</a>
                <a href="/profile">Мой профиль</a>
                <button onClick={() => {
                    navigate_site("/search");
                }}>Поиск</button>
            </nav>
        </header>
    )
}