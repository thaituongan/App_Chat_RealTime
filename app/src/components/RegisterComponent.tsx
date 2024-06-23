import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../websocket/WebSocketService';
import 'bootstrap/dist/css/bootstrap.min.css';
interface RegisterComponentProps {
    wsService: WebSocketService | null;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ wsService }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (wsService) {
            wsService.register(username, password)

            wsService.onMessage((data: any) => {
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleRegister}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
