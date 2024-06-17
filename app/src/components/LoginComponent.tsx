import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../reducer/userSlice';
import WebSocketService from '../websocket/WebSocketService';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            wsService.sendMessage({
                action: 'onchat',
                data: {
                    event: 'LOGIN',
                    data: {
                        user: username,
                        pass: password,
                    },
                },
            });

            wsService.onMessage((data: any) => {
                if (data.status === 'success') {
                    dispatch(login({ username }));
                    navigate('/chat', { state: { username } });
                } else {
                    console.log('Login failed');
                    console.log(data.status);
                    alert('Login failed')
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
                            <h2 className="card-title text-center">Login</h2>
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
                            <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                            </div>
                            <div className="text-center mt-3">
                                <p>
                                    No account? <a href="#" onClick={handleToRegister}>Register</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
