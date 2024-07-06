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

// Định nghĩa kiểu cho các props của ChatComponent
interface ChatComponentProps {
    wsService: WebSocketService;
}

// Định nghĩa component ChatComponent
const ChatComponent: React.FC<ChatComponentProps> = ({ wsService }) => {
    const dispatch = useDispatch(); // Hook để dispatch các hành động redux
    const username = useSelector((state: RootState) => state.user.username); // Lấy tên người dùng từ store
    const messages = useSelector((state: RootState) => state.chat.messages); // Lấy danh sách tin nhắn từ store
    const [input, setInput] = useState<string>(''); // Trạng thái cho input tin nhắn
    const [selectedUser, setSelectedUser] = useState<string | null>(null); // Trạng thái cho người dùng được chọn
    const [selectedUserType, setSelectedUserType] = useState<number | null>(null); // Trạng thái cho loại người dùng được chọn

    // useEffect để xử lý khi nhận tin nhắn mới hoặc danh sách người dùng
    useEffect(() => {
        const handleNewMessage = (data: any) => {
            if (data.event === "GET_PEOPLE_CHAT_MES" && data.status === "success") {
                dispatch(setChatMessages(data.data.reverse())); // Đặt tin nhắn vào store
            } else if (data.event === "GET_USER_LIST" && data.status === "success") {
                dispatch(setUserList(data.data)); // Đặt danh sách người dùng vào store
            }
        };

        wsService.onMessage(handleNewMessage); // Đăng ký hàm xử lý tin nhắn mới

        return () => {
            wsService.getUserList();
        };
    }, [wsService, dispatch]);

    // useEffect để lấy tin nhắn của người dùng được chọn
    useEffect(() => {
        if (selectedUser) {
            if (selectedUserType === 0) {
                wsService.getPeopleChatMessages(selectedUser, 1); // Lấy tin nhắn cá nhân
            } else if (selectedUserType === 1) {
                wsService.getRoomChatMessages(selectedUser, 1); // Lấy tin nhắn nhóm
            }
        }
    }, [selectedUser, selectedUserType, wsService]);

    // Hàm xử lý khi gửi tin nhắn
    const handleSendMessage = () => {
        if (wsService.isConnected() && input.trim() !== '' && selectedUser) {
            const newMessage = {
                id: Date.now(), // Tạo ID duy nhất cho tin nhắn
                name: username,
                type: 0,
                to: selectedUser,
                mes: input,
                createAt: new Date().toISOString(),
            };

            wsService.sendChatMessage('people', selectedUser, input); // Gửi tin nhắn qua WebSocket
            dispatch(addMessage(newMessage)); // Thêm tin nhắn vào store
            setInput(''); // Xoá nội dung input
        } else {
            console.log('WebSocket connection is not open, input is empty, or no user selected');
        }
    };

    // Hàm xử lý khi thay đổi nội dung input
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    // Hàm xử lý khi chọn người dùng từ danh sách
    const handleUserSelect = (username: string, userType: number) => {
        setSelectedUser(username);
        setSelectedUserType(userType);
        if (userType === 0) {
            wsService.getPeopleChatMessages(username, 1); // Lấy tin nhắn cá nhân
        } else if (userType === 1) {
            wsService.getRoomChatMessages(username, 1); // Lấy tin nhắn nhóm
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
