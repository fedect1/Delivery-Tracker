import axios from 'axios';



const deliveryTrackerApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


export default deliveryTrackerApi;