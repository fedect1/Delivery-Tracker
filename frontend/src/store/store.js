import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
import { orderSlice } from './orders/orderSlice';
import { authSlice } from './auth/authSlice';
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        order: orderSlice.reducer,
        auth: authSlice.reducer
    },
});