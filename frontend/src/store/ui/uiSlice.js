

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isNewOrderModalOpen: false,
    },
    reducers: {
        openModal: (state) => {
            state.isNewOrderModalOpen = true;
        },
        closeModal: (state) => {
            state.isNewOrderModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = uiSlice.actions;