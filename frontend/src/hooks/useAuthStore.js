import { useDispatch, useSelector } from "react-redux";
import deliveryTrackerApi from "../api/deliveryTracker";
import { onChecking, onLogin, onLogout, clearErroMessage } from "../store/auth/authSlice";
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        console.log({ email, password })
        try{
            const { data } = await deliveryTrackerApi.post( '/login', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin( {name: data.username} ) );
        } catch (error) {
            dispatch( onLogout( error.response.data.message ) );
            setTimeout(() => {
                dispatch( clearErroMessage() );
            }, 10);
        }
    }


    return {
        status,
        user,
        errorMessage,
        startLogin
    }
}