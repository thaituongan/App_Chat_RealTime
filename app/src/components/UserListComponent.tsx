import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUserList } from '../reducer/userListSlice';
import WebSocketService from '../websocket/WebSocketService';

interface UserListComponentProps {
    wsService: WebSocketService;
    onUserSelect: (username: string) => void;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ wsService, onUserSelect }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.userList.users);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        const handleUserList = (data: any) => {
            if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleUserList);
        wsService.getUserList();

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    const handleUserClick = (user: any) => {
        setSelectedUser(user.name);
        onUserSelect(user.name);
        wsService.getPeopleChatMessages(user.name, 1);
    };


    return (
        <div className="user-list card">
            <div className="card-header">
                <h3>Chat List</h3>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {users.map(user => (
                        <li
                            key={user.name}
                            className={`list-group-item ${selectedUser === user.name ? 'active' : ''}`}
                            onClick={() => handleUserClick(user)}
                        >
                            <strong>Name:</strong> {user.name}<br />
                            <strong>Type:</strong> {user.type}<br />
                            <strong>Action Time:</strong> {user.actionTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListComponent;
