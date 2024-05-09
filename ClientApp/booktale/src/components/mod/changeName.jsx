import { useState } from "react";
import api from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/use-auth";

import "./FormChange.css";


export default function ChangeName() {
    const [new_name, setNewName] = useState(null);
    const [message, setMessage] = useState(null);
    const {login, token, refresh_token} = useAuthUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const req_change_name = async (event) => {
        console.log(token, new_name, refresh_token);
        event.preventDefault();
        const response = await api.patch("/user/update-user-name", null, {
            headers: {
                Authorization: "Bearer " + token
            },
            params: {
                "new_name": new_name
            }
        });
        
        if (response.status == "200") {
            setMessage("Вы успешно изменили своё имя!");
        }
    }

    return (
        <div className="" onSubmit={req_change_name}>
            <form action="" className="form-change-name">
                <br />
                <h3>Введите ваше новое имя</h3>
                <input type="text" placeholder="Ваше новое имя" onChange={(event) => {
                    setNewName(event.target.value)
                }}/>
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