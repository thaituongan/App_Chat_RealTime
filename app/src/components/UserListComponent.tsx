import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUserList } from '../reducer/userListSlice';
import WebSocketService from '../websocket/WebSocketService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface UserListComponentProps {
    wsService: WebSocketService;
    onUserSelect: (username: string, userType: number) => void;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ wsService, onUserSelect }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.userList.users);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [filterType, setFilterType] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

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
        onUserSelect(user.name, user.type);
    };

    const handleCreateRoom = () => {
        if (newRoomName.trim() !== '') {
            wsService.createRoom(newRoomName);
            setNewRoomName('');
            wsService.getUserList();
        }
    };

    const handleJoinRoom = () => {
        if (newRoomName.trim() !== '') {
            wsService.joinRoom(newRoomName);
            setNewRoomName('');
            wsService.getUserList();
        }
    };

    const handleFilterChange = (type: number | null) => {
        setFilterType(type);
    };

    const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewRoomName(e.target.value);
    };

    const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        (filterType === null || user.type === filterType) &&
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addTemporaryUser = () => {
        if (searchQuery.trim() !== '') {
            const temporaryUser = {
                name: searchQuery,
                type: 0,
                actionTime: new Date().toISOString(),
            };

            dispatch(setUserList([...users, temporaryUser]));
            setSearchQuery('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTemporaryUser();
        }
    };

    return (
        <div className="user-list card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name of Room or People"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="input-group-text">
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            onChange={() => handleFilterChange(filterType === 1 ? 0 : 1)}
                        />
                        Room
                    </div>
                    <button className="btn btn-primary" onClick={addTemporaryUser}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            <div className="card-body">
                {filterType === 1 && (
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="New Room Name"
                            value={newRoomName}
                            onChange={handleRoomNameChange}
                        />
                        <button className="btn btn-outline-primary mt-2 " onClick={handleCreateRoom}>
                            Create Room
                        </button>
                        <button className="btn btn-outline-primary mt-2" onClick={handleJoinRoom}>
                            Join Room
                        </button>
                    </div>
                )}
                <ul className="list-group">
                    {filteredUsers.map(user => (
                        <li
                            key={user.name}
                            className={`list-group-item d-flex justify-content-between align-items-center ${selectedUser === user.name ? 'active' : ''}`}
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} className="me-xxl-3 fa-home-user fa-2xl" />
                                <div>
                                    <strong>{user.name}</strong><br />
                                    <small>{new Date(user.actionTime).toLocaleString()}</small>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListComponent;
