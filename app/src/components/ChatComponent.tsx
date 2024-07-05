import React, { ChangeEvent, useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { Chatbox } from "./Chatbox";
import HeaderChat from "./HeaderChat";
import '../styles/style.css';
import WebSocketService from '../websocket/WebSocketService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage, setChatMessages } from '../reducer/chatSlice';
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
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedUserType, setSelectedUserType] = useState<number | null>(null);

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            if (data.event === "GET_PEOPLE_CHAT_MES" && data.status === "success") {
                dispatch(setChatMessages(data.data.reverse()));
            } else if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            }
        };

        wsService.onMessage(handleNewMessage);

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    useEffect(() => {
        if (selectedUser) {
            if (selectedUserType === 0) {
                wsService.getPeopleChatMessages(selectedUser, 1);
            } else if (selectedUserType === 1) {
                wsService.getRoomChatMessages(selectedUser, 1);
            }
        }
    }, [selectedUser, selectedUserType, wsService]);

    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '' && selectedUser) {
            const newMessage = {
                id: Date.now(),
                name: username,
                type: 0,
                to: selectedUser,
                mes: input,
                createAt: new Date().toISOString(),
            };

            wsService.sendChatMessage('people', selectedUser, input);
            dispatch(addMessage(newMessage));
            setInput('');
        } else {
            console.log('WebSocket connection is not open, input is empty, or no user selected');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };
    // const handleChange = (value: string) => {
    //     setInput(value);
    // };
    const handleUserSelect = (username: string, userType: number) => {
        setSelectedUser(username);
        setSelectedUserType(userType);
        if (userType === 0) {
            wsService.getPeopleChatMessages(username, 1);
        } else if (userType === 1) {
            wsService.getRoomChatMessages(username, 1);
        }
    };

    return (
        <div className="chat-app">
            <HeaderChat username={username} wsService={wsService} />
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-4'>
                        <UserListComponent wsService={wsService} onUserSelect={handleUserSelect} />
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
