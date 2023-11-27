import { createSlice } from '@reduxjs/toolkit';

const newOrder = {
    "_id": "12345",
    "trackerNumber": "ORD-12345ABO",
    "costumerInfo": {
        "name": "John Smith",
        "phone": "123-456-7890",
        "address": "123 Main St, Townsville, Nation",
        "email": "raul@gmail.com"
    },
    "orderDetails": {
        "items": [
            {
                "itemName": "Apple",
                "quantity": 5,
                "pricePerItem": 0.6
            },
            {
                "itemName": "Orange",
                "quantity": 4,
                "pricePerItem": 1.0
            },
            {
                "itemName": "Banana",
                "quantity": 15,
                "pricePerItem": 0.4
            }
        ],
        "totalPrice": 10.5
    },
    "status": "pending",
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        listOrders: [newOrder],
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
        }
    },
});

export const { addNewOrder, selectOrder, setActiveOrderModal, setActiveOrderModalToNull, updateStatus } = orderSlice.actions;