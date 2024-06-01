import React, { ChangeEvent, useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { Chatbox } from "./Chatbox";
import '../styles/style.css';
import WebSocketService from '../websocket/WebSocketService';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage, setMessages } from '../reducer/chatSlice';

interface ChatComponentProps {
    wsService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.user.username);
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            const newMessage = JSON.stringify(data);
            dispatch(addMessage(newMessage));
        };

        wsService.onMessage(handleNewMessage);

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '') {
            wsService.sendChatMessage('people', 'long', input);
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
            </div>
        </div>
    );
};

export default ChatComponent;
