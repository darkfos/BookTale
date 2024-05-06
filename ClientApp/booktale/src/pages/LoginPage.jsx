import RegisterButton from "../components/buttons/ButtonForRegister";
import LoginButton from "../components/buttons/LoginButton";
import { useState, Fragment } from "react";
import api from "../api";

export default function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [apiResponse, apiSetResponse] = useState({
        status_code: ""
    });

    const fetchAuthUser = async () => {
        try {
            const responseAPI = await api.post("/auth/oauth2", {
                username: login,
                password: password
            });
            apiSetResponse(responseAPI.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Fragment>
            <form action="">
                <input type="text" value={login} onChange={
                    (event) => {
                        setLogin(event.target.value)
                    }
                } placeholder="Ваш логин"/>
                <input type="password" value={password} onChange={
                    (event) => {
                        setPassword(event.target.value)
                    }
                } placeholder="Ваш пароль"/>
                <LoginButton text="Войти" onClick={fetchAuthUser}/>
                <RegisterButton text="Регистрация"/>
            </form>
        </Fragment>
    )
}