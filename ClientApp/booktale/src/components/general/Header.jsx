import {useNavigate, Outlet, Link} from "react-router-dom";
import useAuthUser from "../../hooks/use-auth";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/slices";
import "./Header.css";

export default function Header() {
    const navigate_site = useNavigate();
    const {isAuth, login, token, refresh_token} = useAuthUser();
    const dispatch = useDispatch();


    return (
        <header>
            <div className="logo">
                <a href="/">BookTale</a>
            </div>
            <nav className="">
                <Link to="/home" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token
                    }));
                }}>Главная</Link>
                <Link to="/library" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token
                    }));
                }}>Библиотека</Link>
                <Link to="/reviews" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token
                    }));
                }}>Отзывы</Link>
                <Link to="/profile" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token
                    }));
                }}>Мой профиль</Link>
                <button onClick={() => {
                    navigate_site("/search");
                }} className="btn_search">Поиск</button>
            </nav>
            <Outlet />
        </header>
    )
}