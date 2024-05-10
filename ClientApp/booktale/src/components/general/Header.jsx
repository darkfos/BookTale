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
                <Link to="/home">BookTale</Link>
            </div>
            <nav className="">
                <Link to="/home" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token,
                        refresh_token: refresh_token,
                    }));
                }}>Главная</Link>
                <Link to="/library" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token,
                        refresh_token: refresh_token,
                    }));
                }}>Библиотека</Link>
                <Link to="/reviews" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token,
                        refresh_token: refresh_token,
                    }));
                }}>Отзывы</Link>
                <Link to="/profile" onClick={() => {
                    dispatch(setUser({
                        login: login,
                        token: token,
                        refresh_token: refresh_token,
                    }));
                }}>Мой профиль</Link>
                <button onClick={() => {
                    navigate_site("/search-book");
                }} className="btn_search">Поиск</button>
            </nav>
            <Outlet />
        </header>
    )
}