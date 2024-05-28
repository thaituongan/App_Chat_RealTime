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
            // Gửi yêu cầu đăng nhập và xử lý kết quả
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

            // Đợi nhận kết quả từ server
            wsService.onMessage((data: any) => {
                // Kiểm tra kết quả từ server
                if (data.status === 'success') {
                    console.log('Login success');
                    setUsername(username);
                    setPassword(password);
                    // Đăng nhập thành công, chuyển hướng đến trang ChatComponent
                    navigate('/chat', { state: { username: username } });

                } else {
                    // Đăng nhập không thành công, xử lý tùy ý
                    console.log('Login failed');
                    console.log(data.status)
                    //console.log(getMessage(data))
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
