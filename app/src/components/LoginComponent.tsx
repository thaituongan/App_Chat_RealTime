import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../reducer/userSlice';
import WebSocketService from '../websocket/WebSocketService';
import { saveReLoginCode } from '../untils/localStorageUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'; // Import the new CSS file

interface LoginComponentProps {
    wsService: WebSocketService | null;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ wsService }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        if (wsService) {
            wsService.login(username, password);
            wsService.onMessage((data: any) => {
                if (data.status === 'success' && data.event === 'LOGIN') {
                    const reloginCode = data.data.RE_LOGIN_CODE;
                    saveReLoginCode(username, reloginCode); // Save reloginCode to localStorage
                    dispatch(loginAction({ username, reloginCode }));
                    navigate('/chat', { state: { username } });
                } else {
                    console.log('Login failed');
                }
            });
        }
    };

    return (
        <div className="login-body">
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title"><b>Welcome!</b></h2>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        className="login-input"
                        placeholder="username"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>Sign In</button>
                <div className="register-link">
                    No account? <span onClick={handleToRegister} className="register-link-text">Register</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoginComponent;
