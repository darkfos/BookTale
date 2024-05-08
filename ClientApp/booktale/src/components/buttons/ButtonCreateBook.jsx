import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuthUser from "../../hooks/use-auth";
import { setUser } from "../../store/slices";
import "./ButtonMain.css";


export default function CreateBook(props) {

    const navigate = useNavigate();
    const {login, token, refresh_token} = useAuthUser();
    const dispatch = useDispatch();

    const new_page = (title_btn) => {
        console.log(title_btn);
        if (title_btn == "Загрузить фотографию") {
            dispatch(setUser({
                login: login,
                token: token,
                refresh_token: refresh_token
            }));
            navigate(props.page_2);
        } else {
            dispatch(setUser({
                login: login,
                token: token,
                refresh_token: refresh_token
            }));
            navigate(props.page_1);
        }
    }
    return (
        <Fragment>
            <button onClick={() => {
                new_page("")
            }} className="btn-create-book">{props.text_1}</button>
            <button onClick={() => {
                new_page("Загрузить фотографию")
            }} className="btn-create-photo">{props.text_2}</button>
        </Fragment>
    )
}
