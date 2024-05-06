import RegisterButton from "../components/buttons/ButtonForRegister";
import LoginButton from "../components/buttons/LoginButton";
import "../components/buttons/ButtonMain.css";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./LoginCss.css";

export default function Login() {

    const [login, setLogin] = useState("");
    const [pass, setPassword] = useState("");
    const [apiResponse, apiSetResponse] = useState("");

    const navigate = useNavigate();

    const DataAuthUser = new URLSearchParams();

    const fetchAuthUser = async (event) => {
        try {
            DataAuthUser.append("username", login);
            DataAuthUser.append("password", pass);

            event.preventDefault();
            const responseAPI = await api.post("/auth/oauth2", DataAuthUser.toString());
            apiSetResponse(responseAPI.status);
            
            if (apiResponse == "201") {
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
    }


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
        </Fragment>
    )
}