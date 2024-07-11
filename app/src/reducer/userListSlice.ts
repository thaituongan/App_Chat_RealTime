import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    type: number;
    actionTime: string;
    status?: boolean; 
}

interface UserListState {
    users: User[];
    page: number;
}

const initialState: UserListState = {
    users: [],
    page: 1,
};

const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        setUserList: (state, action: PayloadAction<User[]>) => {
            console.log("Updating user list in state:", action.payload);
            state.users = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        updateUserStatus: (state, action: PayloadAction<{ name: string; status: boolean }>) => {
            const { name, status } = action.payload;
            const userIndex = state.users.findIndex((user) => user.name === name);
            console.log("user status :", name, status);
            if (userIndex !== -1) {
                state.users[userIndex].status = status;
            }
        },
    },
});

export const { setUserList, setPage, updateUserStatus } = userListSlice.actions;
export default userListSlice.reducer;
