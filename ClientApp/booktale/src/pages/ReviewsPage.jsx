import "./PagesCss.css";
import { Fragment } from "react";
import { useState } from "react";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import "../components/buttons/ButtonMain.css";
import api from "../api";
import useAuthUser from "../hooks/use-auth"
import "./Review.css";

export default function Reviews() {
    const {isAuth, login, token, refresh_token} = useAuthUser();
    const [random_review, setRandomReview] = useState(null);

    const [img_profile, setImage] = useState(null);

    const get_random_review = async () => {
        const responseAPI = await api.get("/review/random-review", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (responseAPI.status == "200") {
            const photoData = responseAPI.data.user_photo; 
            const imageData = photoData.replace(/b'/g, '').replace(/'/g, ''); // Очистка от лишнего
            var img = new Image();
            img.src = "data:image/png;base64," + imageData;
            setImage(img.src);
            setRandomReview(responseAPI.data);
        }
    }
    return (
        <Fragment>
            <Header />
            <main className="container-main">
                <div className="header-review">
                    <h1>Наши отзывы</h1>
                    {random_review? <div className="">
                        <img src={img_profile} alt="Аватар пользователя" className="img-review"/>
                        <h3>{random_review.username}</h3>
                        <p>{random_review.message}</p>
                        <button onClick={get_random_review} className="btn-main">Далее</button>
                    </div>: ''}
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}