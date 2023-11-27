import { useDispatch, useSelector } from "react-redux";
import deliveryTrackerApi from "../api/deliveryTracker";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        console.log({ email, password })
        try{
            console.log("API URL:", import.meta.env.VITE_API_URL);
            const response = await deliveryTrackerApi.post( '/login', { email, password } );
            console.log({ response })
        } catch (error) {
            console.log({ error })
        }
    }


    return {
        status,
        user,
        errorMessage,
        startLogin
    }
}