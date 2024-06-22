import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import WebSocketService from '../websocket/WebSocketService';
import { setUserList } from '../reducer/userListSlice';

interface UserListComponentProps {
    wsService: WebSocketService;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ wsService }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.userList.users);

    useEffect(() => {
        const handleNewUserList = (data: any) => {
            if (data.event === "GET_USER_LIST") {
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleNewUserList);

        wsService.getUserList();

        return () => {
            wsService.close();
        };
    }, [wsService, dispatch]);

    return (
        <div>
            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.name}>
                        {user.name} - Last Active: {user.actionTime} - type: {user.type} 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListComponent;
