import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUserList } from '../reducer/userListSlice';
import WebSocketService from '../websocket/WebSocketService';

interface UserListComponentProps {
    wsService: WebSocketService;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ wsService }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.userList.users);

    useEffect(() => {
        const handleUserList = (data: any) => {
            if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleUserList);
        // wsService.getUserList();

        return () => {
            wsService.getUserList();
            // wsService.close();
        };
    }, [wsService, dispatch]);

    return (
        <div className="user-list">
            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.name}>
                        name: {user.name} - type: {user.type} - action time: {user.actionTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListComponent;
