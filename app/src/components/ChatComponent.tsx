import React, { ChangeEvent, useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { Chatbox } from "./Chatbox";
import '../styles/style.css';
import WebSocketService from '../websocket/WebSocketService';
import { useLocation } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";

interface ChatComponentProps {
    wsService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const location = useLocation();
    const [username, setUsername] = useState<string>(location.state.username);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            const newMessage = JSON.stringify(data);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        wsService.onMessage(handleNewMessage);


        return () => {
            wsService.getUserList();
        };
    }, [wsService]);
    

    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '') {
            wsService.sendChatMessage('people', '21130286', input);
            setInput('');
        } else {
            console.log('WebSocket connection is not open or input is empty');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    return (
        <div>
            <h1 className='hello-user'>Hello {username}</h1>
            <div className='container'>
                <div className='chat-container'>
                    <Chatbox messages={messages} />
                    <InputMessage
                        input={input}
                        onInputChange={handleChange}
                        onSendMessage={handleSendMessage}
                    />
                </div>
                <div className='logout-container'>
                    <LogoutComponent wsService={wsService} />
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
