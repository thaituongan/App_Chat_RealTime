import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    id: number;
    name: string;
    type: number;
    to: string;
    mes: string;
    createAt: string;
}

interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        updateMessage: (state, action: PayloadAction<{ messageId: number, newMes: string }>) => {
            const { messageId, newMes } = action.payload;
            const messageToUpdate = state.messages.find(message => message.id === messageId);
            if (messageToUpdate) {
                messageToUpdate.mes = newMes;
            }
        },
        setChatMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { addMessage, setChatMessages, updateMessage } = chatSlice.actions;
export default chatSlice.reducer;
