import "./PagesCss.css";
import { Fragment } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import api from "../api";
import useAuthUser from "../hooks/use-auth"

export default function Reviews() {
    const {isAuth, login, token, refresh_token} = useAuthUser();

    const get_random_review = async () => {
        const responseAPI = await api.get("/user/profile-information")
    }
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="header">
                    <h1>Наши отзывы</h1>
                    <div className="random-review">
                        <button>Далее</button>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}