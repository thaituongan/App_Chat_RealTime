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
        wsService.getUserList();

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    return (
        <div className="user-list card">
            <div className="card-header">
                <h3>Chat List</h3>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {users.map(user => (
                        <li key={user.name} className="list-group-item">
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
