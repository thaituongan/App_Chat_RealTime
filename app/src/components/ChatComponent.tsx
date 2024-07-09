import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage, setChatMessages } from '../reducer/chatSlice';
import { setUserList } from '../reducer/userListSlice';
import WebSocketService from '../websocket/WebSocketService';
import HeaderChat from './HeaderChat';
import UserListComponent from './UserListComponent';
import Chatbox from './Chatbox';
import InputMessage from './InputMessage';
import '../styles/style.css';
import { getReLoginCode, getUsername, saveReLoginCode } from '../untils/localStorageUtils';
import { reLogin as reLoginAction } from '../reducer/userSlice';

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
    const [currentUser, setCurrentUser] = useState<string>(username);

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            if (data.event === "GET_PEOPLE_CHAT_MES" && data.status === "success") {
                const decodedMessages = data.data.map((msg: any) => ({
                    ...msg,
                    mes: decodeURIComponent(msg.mes)
                }));
                dispatch(setChatMessages(decodedMessages.reverse()));
            } else if (data.event === "GET_ROOM_CHAT_MES" && data.status === "success") {
                const decodedMessages = data.data.chatData.map((msg: any) => ({
                    ...msg,
                    mes: decodeURIComponent(msg.mes)
                }));
                dispatch(setChatMessages(decodedMessages.reverse()));
            } else if (data.event === "SEND_CHAT" && data.status === "success") {
                const newMessage = {
                    ...data.data,
                    mes: decodeURIComponent(data.data.mes)
                };
                dispatch(addMessage(newMessage));
            } else if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data));
            } else if (data.event === "JOIN_ROOM") {
                if (data.status === "success") {
                    console.log(`Joined room ${data.data.name}`);
                    setSelectedUser(data.data.name);
                    setSelectedUserType(1);
                } else {
                    alert(`Failed to join room: ${data.mes}`);
                }
            } else if (data.event === "CREATE_ROOM") {
                if (data.status === "success") {
                    console.log(`Created room ${data.data.name}`);
                    setSelectedUser(data.data.name);
                    setSelectedUserType(1);
                } else {
                    alert(`Failed to create room: ${data.mes}`);
                }
            }
        };

        wsService.onMessage(handleNewMessage);

        const userReload = getUsername();
        const reloginCode = getReLoginCode();
        if (reloginCode && userReload) {
            wsService.reLogin(userReload, reloginCode);
            wsService.onMessage((data: any) => {
                if (data.event === "RE_LOGIN" && data.status === "success") {
                    wsService.getUserList();
                    wsService.onMessage(handleNewMessage);
                    saveReLoginCode(userReload, data.data.RE_LOGIN_CODE);
                    dispatch(reLoginAction({ username: userReload, reloginCode: data.data.RE_LOGIN_CODE }));

                    const name = getUsername();
                    if (name) {
                        setCurrentUser(name);
                    }
                    if (selectedUser) {
                        if (selectedUserType === 0) {
                            wsService.getPeopleChatMessages(selectedUser, 1);
                        } else if (selectedUserType === 1) {
                            wsService.getRoomChatMessages(selectedUser, 1);
                        }
                    }
                }
            });
        } else {
            alert('no relogin');
        }

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch, selectedUser, selectedUserType]);

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

            const encodedMessage = encodeURIComponent(input);

            if (selectedUserType === 0) {
                wsService.sendChatMessage('people', selectedUser, encodedMessage);
            } else if (selectedUserType === 1) {
                wsService.sendChatMessage('room', selectedUser, encodedMessage);
            }

            setInput('');
            dispatch(setChatMessages([...messages, newMessage])); // Cập nhật lại messages
        } else {
            console.log('WebSocket connection is not open, input is empty, or no user selected');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

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
            <HeaderChat username={currentUser} wsService={wsService} />
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-4'>
                        <UserListComponent wsService={wsService} onUserSelect={handleUserSelect} />
                    </div>
                    <div className='col-md-8 chat-container'>
                        <Chatbox messages={messages} username={currentUser} />
                        <InputMessage input={input} onInputChange={handleChange} onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
