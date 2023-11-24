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
    }
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        listOrders: [newOrder],
        isActiveModal: false,
        selectedOrderId: null,
    },
    reducers: {
        addToOrder: (state, { payload }) => {
            state.listOrders.push(payload);
        },
        selectOrder: (state, { payload }) => {
            state.selectedOrderId = payload;
        },
    },
});

export const { addToOrder, selectOrder } = orderSlice.actions;