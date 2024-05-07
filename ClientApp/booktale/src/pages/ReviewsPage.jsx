import "./PagesCss.css";
import { Fragment } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Main components for page
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import "../components/buttons/ButtonMain.css";
import api from "../api";
import useAuthUser from "../hooks/use-auth"
import "./Review.css";
import { setUser } from "../store/slices";

export default function Reviews() {
    const {isAuth, login, token, refresh_token} = useAuthUser();
    const [random_review, setRandomReview] = useState(null);
    const [message, setMessage] = useState(null);

    const [img_profile, setImage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


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


    const create_review_user = async (event) => {
        event.preventDefault();
        console.log(token);
        const responseAPIcreatereview = await api.post("/review/create-review", {message: message}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (responseAPIcreatereview.status == "201" ){
            dispatch(setUser({
                login: login,
                token: token,
                refresh_token: refresh_token
            }));
            navigate("/home");
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
                    </div>: <div className="">
                    <button onClick={get_random_review} className="btn-main">Далее</button>
                    </div>}
                </div>
                <div className="create_form_review">
                    <form action="" onSubmit={create_review_user}>
                        <h2>Создание отзыва</h2>
                        <p>Пожалуйста поделитесь вашим впечатлениями о нашем сервисе</p>
                        <textarea name="message" id="" cols="30" rows="10" className="message_from_user" placeholder="Ваш отзыв" onChange={(event) => {
                            setMessage(event.target.value);
                        }}></textarea>
                        <button type="submit" className="btn-main">Отправить</button>
                    </form>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}