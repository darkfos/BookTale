import { useState } from "react";
import api from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/use-auth";

import "./FormChange.css";


export default function ChangePhoto() {
    const [new_photo, setNewPhoto] = useState(null);
    const [message, setMessage] = useState(null);
    const {login, token, refresh_token} = useAuthUser();


    const req_change_photo = async (event) => {
        event.preventDefault();
        const response = await api.patch("/user/update-user-photo", {
            "new_photo": new_photo
        }, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });
        
        if (response.status == "200") {
            setMessage("Вы успешно изменили свою фотографию!");
        }
    }

    return (
        <div className="" onSubmit={req_change_photo}>
            <form action="" className="form-change-name">
                <br />
                <h3>Введите ваше новое имя</h3>
                <input type="file" onChange={(event) => {
                    setNewPhoto(event.target.files[0]) //передаем все данные файла
                }} accept="image/png, image/jpg, image/jpeg"/>
                <br />
                <br />
                {message? <p className="message_success">{message}</p>: ""}
                <button type="submit" className="btn-update">Отправить</button>
                <br />
                <br />
            </form>
        </div>
    )
}