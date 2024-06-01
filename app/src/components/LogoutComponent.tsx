import React from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import WebSocketService from '../websocket/WebSocketService';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LogoutComponentProps {
    wsService: WebSocketService;
}

const LogoutComponent: React.FC<LogoutComponentProps> = ({ wsService }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (wsService) {
            wsService.logout();
            navigate('/');
        }
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutComponent;