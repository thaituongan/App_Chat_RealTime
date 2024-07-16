import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUserList } from '../reducer/userListSlice';
import WebSocketService from '../websocket/WebSocketService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faMagnifyingGlass, faTimes, faUserCircle} from '@fortawesome/free-solid-svg-icons';

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
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [suscessMessage, setSuscessMessage] = useState<string>('');

    const addHoursToDate = (date: string, hours: number): string => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result.toLocaleString();
    };

    useEffect(() => {
        const handleUserList = (data: any) => {
            if (data.event === "GET_USER_LIST" && data.status === "success") {
                const usersWithStatus = data.data.map((user: any) => ({
                    name: user.name,
                    type: user.type,
                    actionTime: user.actionTime,
                    status: user.status,
                }));
                dispatch(setUserList(usersWithStatus));
            }
        };

        wsService.onMessage(handleUserList);

        return () => {

        };
    }, [wsService, dispatch]);

    const handleUserClick = (user: any) => {
        setSelectedUser(user.name);
        onUserSelect(user.name, user.type);
    };

    const handleCreateRoom = () => {
        if (newRoomName.trim() !== '') {
            wsService.createRoom(newRoomName,
                () => {
                    setNewRoomName('');
                    wsService.getUserList();
                    setSearchQuery('');
                    setErrorMessage('');
                    setSuscessMessage('Create Room Successfully')
                },
                (error: any) => {
                    setErrorMessage('Room already exists');
                    setSuscessMessage('')

                }
            );
        } else {
            setErrorMessage('Room name cannot be empty');
            setSuscessMessage('')
        }
    };

    const handleJoinRoom = () => {
        if (newRoomName.trim() !== '') {
            wsService.joinRoom(newRoomName,
                () => {
                    setNewRoomName('');
                    wsService.getUserList();
                    setSearchQuery('');
                    setErrorMessage('');
                    setSuscessMessage('Join Room Successfully')
                },
                (error: any) => {
                    setErrorMessage('Room does not exist');
                    setSuscessMessage('')
                }
            );
        } else {
            setErrorMessage('Room name cannot be empty');
            setSuscessMessage('')
        }
    };

    const handleFilterChange = (type: number | null) => {
        setFilterType(type);
    };

    const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (filterType === 1){
            setNewRoomName(e.target.value);
        }

    };

    const filteredUsers = users && Array.isArray(users) ? users.filter(user =>
        (filterType === null || user.type === filterType) &&
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const addTemporaryUser = () => {
        if (searchQuery.trim() !== '') {
            const temporaryUser = {
                name: searchQuery,
                type: 0,
                actionTime: new Date().toISOString(),
                status: false,
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
    const handleOffErrorClick = () => {
        setErrorMessage('');
        setSuscessMessage('');
    };


    return (
        <div className="user-list card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="search">
                    <div className='search-bar d-flex'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-lg ' />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="group-checkbox me-4">
                        <input
                            className="form-check-input me-1"
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
            {errorMessage && (
                <div className=" error-message d-flex justify-content-between align-items-center" role="alert">
                    <span className="error-text">{errorMessage}</span>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleOffErrorClick} />
                </div>
            )}
            {suscessMessage && (
                <div className=" success-message d-flex justify-content-between align-items-center" role="alert">
                    <span className="error-text">{suscessMessage}</span>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleOffErrorClick} />
                </div>
            )}
            <div className="card-body">
                {filterType === 1 && (
                    <div className="mb-3">
                        <div className='group-btn'>
                            <button className="btn btn-outline-primary create-btn mt-2 me-2" onClick={handleCreateRoom}>
                                Create Room
                            </button>
                            <button className="btn btn-outline-primary join-btn mt-2" onClick={handleJoinRoom}>
                                Join Room
                            </button>
                        </div>
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
                                    <small>{addHoursToDate(user.actionTime, 7)}</small>
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