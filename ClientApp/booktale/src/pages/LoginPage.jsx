import RegisterButton from "../components/buttons/ButtonForRegister";
import LoginButton from "../components/buttons/LoginButton";

export default function Login() {
    return (
        <div>
            <h1>Страница входа</h1>
            <LoginButton text="Войти"/>
            <RegisterButton text="Регистрация"/>
        </div>
    )
}