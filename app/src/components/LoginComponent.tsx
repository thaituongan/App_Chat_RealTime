import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../websocket/WebSocketService';

interface LoginComponentProps {
    wsService: WebSocketService | null;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ wsService }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (wsService) {
           // wsService.onLoginSuccess = () => {
                navigate('/chat');
           // };
            wsService.sendMessage({
                action: 'onchat',
                data: {
                    event: 'LOGIN',
                    data: {
                        user: username,
                        pass: password
                    }
                }
            });
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginComponent;
