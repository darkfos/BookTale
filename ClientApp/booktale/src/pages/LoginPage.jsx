import RegisterButton from "../components/buttons/ButtonForRegister";
import "../components/buttons/ButtonMain.css";
import { useState, Fragment, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {setUser} from "../store/slices.js"
import api from "../api";
import { useDispatch } from "react-redux";
import "./LoginCss.css";

export default function Login() {

    const [login, setLogin] = useState("");
    const [pass, setPassword] = useState("");
    const [apiResponse, apiSetResponse] = useState("");

    const navigate = useNavigate();

    const DataAuthUser = new URLSearchParams();
    const dispatch = useDispatch();

    const fetchAuthUser = async (event) => {
        try {
            DataAuthUser.append("username", login);
            DataAuthUser.append("password", pass);

            event.preventDefault();
            const responseAPI = await api.post("/auth/oauth2", DataAuthUser.toString());
            
            if (responseAPI.status == "201") {
                dispatch(setUser({
                    login: login,
                    token: responseAPI.data.access_token,
                    refresh_token: responseAPI.data.refresh_token
                }));
                apiSetResponse(responseAPI.status)
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Хук - переход на новую страницу
    useEffect(() => {
        if (apiResponse == "201") {
            navigate("/home");
        }
    }, [apiResponse]);

    return (
        <Fragment>
            <form action="" onSubmit={fetchAuthUser} className="form-auth-user">
                <h2>Авторизация</h2>
                <input type="text" value={login} onChange={
                    (event) => {
                        setLogin(event.target.value)
                    }
                } placeholder="Ваш логин"/>
                <input type="password" value={pass} onChange={
                    (event) => {
                        setPassword(event.target.value)
                    }
                } placeholder="Ваш пароль"/>
                <div className="btn-form">
                    <button type="submit" className="btn-main">Войти</button>
                    <RegisterButton text="Регистрация"/>
                </div>
            </form>
            <Outlet />
        </Fragment>
    )
}