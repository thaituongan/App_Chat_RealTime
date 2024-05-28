import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import ChatComponent from './components/ChatComponent';
import WebSocketService from './websocket/WebSocketService';

const App: React.FC = () => {
    const [wsService, setWsService] = useState<WebSocketService | null>(null);

    useEffect(() => {
        const service = new WebSocketService('ws://140.238.54.136:8080/chat/chat');
        setWsService(service);

        return () => {
            if (service) {
                service.close();
            }
        };
    }, []);

    return (
        <Routes>

                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginComponent wsService={wsService} />} />
                {wsService && <Route path="/chat" element={<ChatComponent wsService={wsService} />} />}

        </Routes>
    );
};

export default App;
