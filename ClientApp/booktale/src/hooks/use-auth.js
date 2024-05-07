import {useSelector} from "react-redux";


export default function useAuthUser() {
    const {login, token, refresh_token} = useSelector(state => state.user);

    return {    
        isAuth: !!login,
        login,
        token,
        refresh_token,
    };
}