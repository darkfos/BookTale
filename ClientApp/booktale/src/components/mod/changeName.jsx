import Modal from "react-modal";
import { useState } from "react";
import api from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/use-auth";

import "./FormChange.css";


export default function ChangeName({ closeModal }) {
    const [new_name, setNewName] = useState(null);
    const {login, token, refresh_token} = useAuthUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changename = async (event) => {

        event.preventDefault();
        const response = await api.patch("/user/update-user-name", {
            new_name: new_name
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        if (response.status == "200") {
            navigate("/profile");
        }
    }

    return (
        <div className="" onSubmit={changename}>
            <form action="" className="form-change-name">
                <h3>Введите ваше новое имя</h3>
                <input type="text" placeholder="Ваше новое имя" onChange={(event) => {
                    setNewName(event.target.value)
                }}/>
                <button type="submit" className="btn-main">Отправить</button>
            </form>
        </div>
    )
}