import axios from 'axios';



const deliveryTrackerApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

deliveryTrackerApi.interceptors.request.use( config => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
});

export default deliveryTrackerApi;