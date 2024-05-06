import "./PagesCss.css";
import { Fragment } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";

export default function Profile() {
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <h1>Добро пожаловать на страницу Профиль!</h1>
            </main>
            <Footer />
        </Fragment>
    )
}