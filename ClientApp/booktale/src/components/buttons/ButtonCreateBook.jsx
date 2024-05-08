import { Fragment } from "react";
import "./ButtonMain.css";


export default function CreateBook(props) {

    return (
        <Fragment>
            <input type="file" accept=".docx, .pdf"/>
            <input type="file" accept="image/png, image/jpeg, image/jpg"/>
        </Fragment>
    )
}
