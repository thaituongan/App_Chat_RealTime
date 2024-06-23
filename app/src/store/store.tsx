import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/userSlice';
import chatReducer from '../reducer/chatSlice';
import userListReducer from '../reducer/userListSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        userList: userListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;