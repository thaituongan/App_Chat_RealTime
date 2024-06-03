import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    messages: string[];
}

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<string[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { addMessage, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
