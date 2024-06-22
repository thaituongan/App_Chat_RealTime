import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    type: number;
    actionTime: string;
}

interface UserListState {
    users: User[];
}

const initialState: UserListState = {
    users: [],
};

const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        setUserList: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
});

export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;