import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
import { orderSlice } from './orders/orderSlice';
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        order: orderSlice.reducer,
    },
});