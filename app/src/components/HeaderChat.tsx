import React from 'react';
import LogoutComponent from "./LogoutComponent";
import WebSocketService from '../websocket/WebSocketService';
import '../styles/style.css';

interface HeaderChatProps {
    username: string;
    wsService: WebSocketService;
}

const HeaderChat: React.FC<HeaderChatProps> = ({ username, wsService }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar">
            <div className="container">
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link">Welcome, {username}</span>
                        </li>
                        <li className="nav-item">
                            <LogoutComponent wsService={wsService} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderChat;
