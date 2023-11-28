import { useDispatch, useSelector } from "react-redux";
import deliveryTrackerApi from "../api/deliveryTracker";
import { onChecking, onLogin, onLogout, clearErroMessage } from "../store/auth/authSlice";
import Swal from "sweetalert2";
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
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

    const startSignUp = async ({ email, password, username }) => {
        dispatch( onChecking() );
        try{
            const { data } = await deliveryTrackerApi.post( '/users', { username, email, password } );
            Swal.fire( 'Success', `${data.username} created successfully`, 'success' );
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
        startLogin,
        startSignUp
    }
}