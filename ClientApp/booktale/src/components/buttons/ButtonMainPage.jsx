import "./ButtonMain.css";
import { useNavigate } from "react-router-dom";

export default function ButtonMain( props ) {
    const navigate = useNavigate();

    const new_page = () => {
        navigate(props.nvg);
    }

    return (
        <button className="btn-main" onClick={() => {
            new_page()
        }}>{props.text}</button>
    )
}