import "./ButtonMain.css";
import { useNavigate } from "react-router-dom";


export default function BtnProfile(props) {
    
    const navigate = useNavigate();

    const new_page = () => {
        navigate(props.navigate_page);
    }
    return (
        <button className="btn-main" onClick={new_page}>{props.text}</button>
    )
}