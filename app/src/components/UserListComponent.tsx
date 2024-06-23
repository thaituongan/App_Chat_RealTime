import React, { useState, useEffect } from 'react';
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
    const [page, setPage] = useState<number>(1);


    useEffect(() => {
        const handleUserList = (data: any) => {
            if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleUserList);

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    const handleUserClick = (user: any) => {
        wsService.getPeopleChatMessages(user.name, 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
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
                            className="list-group-item"
                            onClick={() => handleUserClick(user)}
                        >
                            <strong>Name:</strong> {user.name}<br />
                            <strong>Type:</strong> {user.type}<br />
                            <strong>Action Time:</strong> {user.actionTime}
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button className="btn btn-primary" onClick={handlePreviousPage} disabled={page === 1}>
                        Previous
                    </button>
                    <span className="mx-3">Page {page}</span>
                    <button className="btn btn-primary" onClick={handleNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserListComponent;
