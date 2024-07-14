import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../websocket/WebSocketService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
interface RegisterComponentProps {
    wsService: WebSocketService | null;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ wsService }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleToLogin = () => {
        navigate('/login');
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleRegister();
        }
    };

    const handleRegister = () => {
        if (username === '') {
            setError('Please enter username!');
            return;
        } else if (password === '') {
            setError('Please enter password!');
            return;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (wsService) {
            wsService.register(username, password);
            wsService.onMessage((data: any) => {
                if (data.status === 'success' && data.event === 'REGISTER') {
                    setError('');
                    setShowPopup(true); // Show the popup
                } else {
                    console.log('Registration failed');
                    setError('Account already exists');
                }
            });
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/login');
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <div className="register-card">
                    <h2 className="register-title"><b>Register</b></h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            className="register-input"
                            placeholder="Username"
                            value={username}
                            onKeyPress={handleKeyPress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="register-input"
                            placeholder="Password"
                            value={password}
                            onKeyPress={handleKeyPress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            className="register-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onKeyPress={handleKeyPress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="register-button" onClick={handleRegister}>Sign Up</button>
                    <div className="login-link">
                        Already have an account? <span onClick={handleToLogin} className="login-link-text">Login</span>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Successfully Registered</h3>
                        <p>Going to Login?</p>
                        <button className="popup-button btn btn-primary" onClick={handlePopupClose}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterComponent;
