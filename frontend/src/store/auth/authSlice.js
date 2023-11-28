import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined
        },
        onLogout: (state,) => {
            state.status = 'non-authenticated';
            state.user = {};
            state.errorMessage = undefined
        },
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {},
            state.errorMessage = undefined
        },
        error: (state, { payload }) => {
            state.status = 'non-authenticated';
            state.errorMessage = payload
        },
        clearErroMessage: (state) => {
            state.errorMessage = undefined;
        },
    }
});

export const { onLogin, onLogout, onChecking, error, clearErroMessage } = authSlice.actions;