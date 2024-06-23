import React, { ChangeEvent, useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { Chatbox } from "./Chatbox";
import HeaderChat from "./HeaderChat";
import '../styles/style.css';
import WebSocketService from '../websocket/WebSocketService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage } from '../reducer/chatSlice';
import UserListComponent from "./UserListComponent";
import { setUserList } from "../reducer/userListSlice";

interface ChatComponentProps {
    wsService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.user.username);
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            const newMessage = JSON.stringify(data);
            dispatch(addMessage(newMessage));

            if(data.event === "GET_USER_LIST"){
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleNewMessage);
        //wsService.getUserList();

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '') {
            wsService.sendChatMessage('people', username, input);
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
            <HeaderChat username={username} wsService={wsService} />
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-4'>
                        <UserListComponent wsService={wsService} />
                    </div>
                    <div className='col-md-8 chat-container'>
                        <Chatbox messages={messages} />
                        <InputMessage
                            input={input}
                            onInputChange={handleChange}
                            onSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
