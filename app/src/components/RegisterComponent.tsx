import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../websocket/WebSocketService';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RegisterComponentProps {
    wsService: WebSocketService | null;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ wsService }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (wsService) {
            wsService.sendMessage({
                action: 'onchat',
                data: {
                    event: 'REGISTER',
                    data: {
                        user: username,
                        pass: password
                    }
                }
            });


            wsService.onMessage((data: any) => {
                // Kiểm tra kết quả từ server
                if (data.status === 'success') {
                    console.log('Registration success');
                    navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
                } else {
                    console.log('Registration failed');
                    setError('Registration failed: ' + data.message);
                }
            });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Register</h2>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleRegister}>Register</button>
                            </div>
                            <div className="text-center mt-3">
                                <p>
                                    Already have an account? <a href="/login">Login</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
