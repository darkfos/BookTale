import RegisterButton from "../components/buttons/ButtonForRegister";
import LoginButton from "../components/buttons/LoginButton";
import { useState, Fragment } from "react";

export default function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
                <LoginButton text="Войти"/>
                <RegisterButton text="Регистрация"/>
            </form>
        </Fragment>
    )
}