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
    const [filter, setFilter] = useState<'people' | 'group'>('people');

    useEffect(() => {
        const handleUserList = (data: any) => {
            if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            }
        };

        return () => {
            wsService.onMessage(handleUserList);
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    const handleUserClick = (user: any) => {
        setSelectedUser(user.name);
        onUserSelect(user.name);
        if (user.type === 0) {
            wsService.getPeopleChatMessages(user.name, 1);
        } else if (user.type === 1) {
            wsService.getRoomChatMessages(user.name, 1);
        }
    };

    const filteredUsers = users.filter(user => filter === 'people' ? user.type === 0 : user.type === 1);

    return (
        <div className="user-list card">
            <div className="card-header">
                {/*<h3>Chat List</h3>*/}
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        className={`btn ${filter === 'people' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('people')}
                    >
                        People
                    </button>
                    <button
                        type="button"
                        className={`btn ${filter === 'group' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('group')}
                    >
                        Group
                    </button>
                </div>
            </div>
            <div className="user-list card-body">
                <ul className="list-group">
                    {filteredUsers.map(user => (
                        <li
                            key={user.name}
                            className={`list-group-item ${selectedUser === user.name ? 'active' : ''}`}
                            onClick={() => handleUserClick(user)}
                        >
                            <strong>Name:</strong> {user.name}<br />
                            <strong>Type:</strong> {user.type === 0 ? 'People' : 'Group'}<br />
                            <strong>Action Time:</strong> {user.actionTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListComponent;
