import {useSelector} from "react-redux";


export default function useAuthUser() {
    const {login, token, id} = useSelector(state => state.user);

    return {
        isAuth: !!login,
        login,
        token,
        id,
    }
}