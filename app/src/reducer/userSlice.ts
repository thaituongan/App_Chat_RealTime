import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    username: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string }>) => {
            state.username = action.payload.username;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.username = '';
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
