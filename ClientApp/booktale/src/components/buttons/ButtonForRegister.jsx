import "./ButtonMain.css";
import {
    useNavigate
} from "react-router-dom";

export default function RegisterButton(props) {
    const navigate_to_register_page = useNavigate();

    return (
        <button className="btn-main" onClick={
            () => {
                navigate_to_register_page("/register")
            }
        }>{props.text}</button>
    )
}