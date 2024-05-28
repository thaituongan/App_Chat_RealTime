import React, { ChangeEvent, useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { Chatbox } from "./Chatbox";
import '../styles/style.css';
import WebSocketService from '../websocket/WebSocketService';

interface ChatComponentProps {
    wsService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            const newMessage = JSON.stringify(data);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        wsService.onMessage(handleNewMessage);

        return () => {
            wsService.close()
        };
    }, [wsService]);

    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '') {
            wsService.sendChatMessage('people', 'ti', input);
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
            <h1>Chat App</h1>
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
