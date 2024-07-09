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

interface ChatComponentProps {
    wsService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.user.username); // Lấy username từ Redux store
    const messages = useSelector((state: RootState) => state.chat.messages); // Lấy danh sách tin nhắn từ Redux store
    const [input, setInput] = useState<string>(''); // State để lưu nội dung tin nhắn nhập vào
    const [selectedUser, setSelectedUser] = useState<string | null>(null); // State để lưu người dùng hoặc phòng được chọn
    const [selectedUserType, setSelectedUserType] = useState<number | null>(null); // State để lưu loại người dùng (0: người, 1: phòng)

    useEffect(() => {
        const handleNewMessage = (data: any) => {
            if (data.event === "GET_PEOPLE_CHAT_MES" && data.status === "success") {
                const decodedMessages = data.data.map((msg: any) => ({
                    ...msg,
                    mes: decodeURIComponent(msg.mes)
                }));
                dispatch(setChatMessages(decodedMessages.reverse())); // Nếu nhận được tin nhắn cá nhân, cập nhật Redux store với các tin nhắn đó
            } else if (data.event === "GET_ROOM_CHAT_MES" && data.status === "success") {
                const decodedMessages = data.data.chatData.map((msg: any) => ({
                    ...msg,
                    mes: decodeURIComponent(msg.mes)
                }));
                dispatch(setChatMessages(decodedMessages.reverse())); // Nếu nhận được tin nhắn nhóm, cập nhật Redux store với các tin nhắn đó
            } else if (data.event === "SEND_CHAT" && data.status === "success") {
                const newMessage = {
                    ...data.data,
                    mes: decodeURIComponent(data.data.mes)
                };
                dispatch(addMessage(newMessage)); // Thêm tin nhắn mới vào Redux store
            } else if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data)); // Nếu nhận được danh sách người dùng, cập nhật Redux store với danh sách đó
            } else if (data.event === "JOIN_ROOM") {
                if (data.status === "success") {
                    console.log(`Joined room ${data.data.name}`);
                    setSelectedUser(data.data.name); // Cập nhật phòng đã tham gia
                    setSelectedUserType(1);
                } else {
                    alert(`Failed to join room: ${data.mes}`);
                }
            } else if (data.event === "CREATE_ROOM") {
                if (data.status === "success") {
                    console.log(`Created room ${data.data.name}`);
                    setSelectedUser(data.data.name); // Cập nhật phòng đã tạo
                    setSelectedUserType(1); //
                } else {
                    alert(`Failed to create room: ${data.mes}`);
                }
            }
        };

        wsService.onMessage(handleNewMessage); // Thiết lập hàm xử lý khi nhận được tin nhắn từ WebSocket

        return () => {
            wsService.getUserList(); // Lấy danh sách người dùng khi component unmount
        };
    }, [wsService, dispatch]);



    useEffect(() => {
        if (selectedUser) {
            if (selectedUserType === 0) {
                wsService.getPeopleChatMessages(selectedUser, 1); // Lấy tin nhắn cá nhân nếu người dùng là people
            } else if (selectedUserType === 1) {
                wsService.getRoomChatMessages(selectedUser, 1); // Lấy tin nhắn nhóm nếu người dùng là room
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
                wsService.sendChatMessage('people', selectedUser, encodedMessage); // Gửi tin nhắn cá nhân
            } else if (selectedUserType === 1) {
                wsService.sendChatMessage('room', selectedUser, encodedMessage); // Gửi tin nhắn nhóm
            }

            dispatch(addMessage(newMessage)); // Thêm tin nhắn mới vào Redux store
            setInput(''); // Reset input
        } else {
            console.log('WebSocket connection is not open, input is empty, or no user selected');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value); // Cập nhật state khi nội dung tin nhắn thay đổi
    };

    const handleUserSelect = (username: string, userType: number) => {
        setSelectedUser(username); // Cập nhật người dùng hoặc phòng được chọn
        setSelectedUserType(userType); // Cập nhật loại người dùng
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
                        <InputMessage input={input} onInputChange={handleChange} onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
