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
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [filterType, setFilterType] = useState<number | null>(0);

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
        if (user.type === 0) {
            wsService.getPeopleChatMessages(user.name, 1);
        } else if (user.type === 1) {
            wsService.getRoomChatMessages(user.name, 1);
        }
    };

    const handleCreateRoom = () => {
        if (newRoomName.trim() !== '') {
            wsService.createRoom(newRoomName);
            setNewRoomName(''); // Clear the input field after creating the room
        }
    };

    const handleFilterChange = (type: number | null) => {
        setFilterType(type);
    };

    const filteredUsers = users.filter(user => filterType === null || user.type === filterType);

    return (
        <div className="user-list card">
            <div className="card-header">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button  type="button"
                             className={`btn ${filterType === 0 ? 'btn-primary' : 'btn-secondary'}`}
                             onClick={() => handleFilterChange(0)}>People</button>
                    <button
                        type="button"
                        className={`btn ${filterType === 1 ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleFilterChange(1)}>Groups</button>
                </div>
                <div>
                    <input
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Enter room name"
                    />
                    <button
                        onClick={handleCreateRoom}>Create Room</button>
                </div>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {filteredUsers.map(user => (
                        <li
                            key={user.name}
                            className={`list-group-item ${selectedUser === user.name ? 'active' : ''}`}
                            onClick={() => handleUserClick(user)}
                        >
                            <strong>{user.name}</strong> <br />
                            {user.actionTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListComponent;
