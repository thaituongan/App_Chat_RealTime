import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    isLoggedIn: boolean;
    reloginCode: string;
}

const initialState: UserState = {
    username: '',
    isLoggedIn: false,
    reloginCode: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; reloginCode: string }>) => {
            state.username = action.payload.username;
            state.isLoggedIn = true;
            state.reloginCode = action.payload.reloginCode;
        },
        logout: (state) => {
            state.username = '';
            state.isLoggedIn = false;
            state.reloginCode = '';
        },
        reLogin: (state, action: PayloadAction<{ reloginCode: string }>) => {
            state.reloginCode = action.payload.reloginCode;
        }
    }
});

export const { login, logout, reLogin } = userSlice.actions;

export default userSlice.reducer;
