import { createSlice } from '@reduxjs/toolkit';



export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: true,
        listOrders: [],
        isActiveOrder: null,
        selectedOrderId: null,
    },
    reducers: {
        addNewOrder: (state, { payload }) => {
            state.listOrders.push(payload);
            state.isActiveOrder = null;
        },
        selectOrder: (state, { payload }) => {
            state.selectedOrderId = payload;
        },
        setActiveOrderModal: (state, { payload }) => {
            state.isActiveOrder = state.listOrders.find(order => order._id === payload);
        },
        setActiveOrderModalToNull: (state) => {
            state.isActiveOrder = null;
        },
        updateStatus: (state, { payload }) => {
            state.listOrders.map(order => {
                if (order._id === payload._id) {
                    return {...order, status: payload.status}
                }
                return order;
            })
            state.isActiveOrder = null;
        },
        onLoadOrders: (state, { payload = [] }) => {

            payload.forEach(order => {
                const existingOrder = state.listOrders.some(dbOrder => dbOrder._id === order._id);
                if (!existingOrder) {
                    state.listOrders.push(order);
                }
            });
            state.isLoading = false;
        }
    },
});

export const { addNewOrder, selectOrder, setActiveOrderModal, setActiveOrderModalToNull, updateStatus, onLoadOrders } = orderSlice.actions;