import RegisterButton from "../components/buttons/ButtonForRegister";
import LoginButton from "../components/buttons/LoginButton";
import "../components/buttons/ButtonMain.css";
import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img_profile from "../static/profile_photo.jpg";
import api from "../api";
import "./LoginCss.css";


export default function Register() {
    const [username, setUserName] = useState("");
    const [login, setLogin] = useState("");
    const [userphoto, setPhoto] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [messageSuccess, setMessage] = useState(null);
    const [pass, setPassword] = useState("");
    const [apiResponse, apiSetResponse] = useState("");

    const navigate = useNavigate();

    const fetchAuthUser = async (event) => {
        try {
            event.preventDefault();

            if (pass.length > 4 && login.length > 4 && userphoto) {
                const responseAPI = await api.post("/user/registration", {
                    username: username,
                    photo_user: userphoto,
                    login: login,
                    hasshed_password: pass,
                    date_create: new Date(),
                    date_update: new Date()
                });
                apiSetResponse(responseAPI.status);
                setError(null);
                if (apiResponse == "201") {
                    setMessage("Вы были зарегистрированы");
                    apiSetResponse("201");
                }
            } else {
                setError("Некорректные данные для регистрации!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getBytePhoto = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                let byteArray = new Uint8Array(arrayBuffer);
                // Преобразование массива байтов в строку base64
                let base64String = btoa(String.fromCharCode.apply(null, byteArray)).toString();
                setPhoto(base64String);
                setError(null);
            };
            reader.readAsArrayBuffer(file);
        } else {
            setError("Ожидается фотография!");
            console.log(errorMessage);
        }
    }

    //Отрисовка новой страницы
    useEffect(() => {
        if (apiResponse == "201") {
            navigate("/login");
        }
    }, [apiResponse])

    return (
        <Fragment>
            <form action="" onSubmit={fetchAuthUser} className="form-auth-user">
                <h2>Регистрация</h2>
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
                <input type="text" value={username} placeholder="Ваше имя" onChange={(event) => {
                    setUserName(event.target.value)
                }}/>
                <input type="file" placeholder="Ваша фотография" onChange={getBytePhoto}/>
                <div className="btn-form">
                    <button type="submit" className="btn-main">Регистрация</button>
                    <button onClick={() => {
                        navigate("/login")
                    }} className="btn-main">Авторизация</button>
                </div>
                {errorMessage? <p className="error">{errorMessage}</p> : <p></p>}
                {messageSuccess? <p className="great">{messageSuccess}</p> : <p></p>}
            </form>
        </Fragment>
    )
}