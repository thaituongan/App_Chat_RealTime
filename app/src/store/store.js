// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    messages: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const { setUser, addMessage, setMessages } = chatSlice.actions;

const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
    },
});

export default store;
