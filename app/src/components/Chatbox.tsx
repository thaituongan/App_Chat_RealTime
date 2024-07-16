import React, { FC, useEffect, useRef } from "react";
import "../styles/style.css";
import { faCircleInfo, faPhone, faUserCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
    id: number;
    name: string;
    type: number;
    to: string;
    mes: string;
    createAt: string;
}

interface ChatboxProps {
    messages: Message[];
    username: string;
    selectedUser: string | null;
    userStatus: string | null;
}

const Chatbox: FC<ChatboxProps> = ({ messages, username, selectedUser, userStatus }) => {
    // Tham chiếu đến phần tử cuối cùng của chatbox để cuộn xuống khi có tin nhắn mới
    const chatEndRef = useRef<HTMLDivElement>(null);

    //ham cong them gio de hien thi dung gio hien tai sao khi lay gio tu server
    const addHoursToDate = (date: string, hours: number): string => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result.toLocaleString();
    };

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    //ham nhom tin nhan theo nguoi gui
    const groupMessagesByUser = (messages: Message[]) => {
        const groupedMessages: { user: string; messages: Message[] }[] = [];
        let currentGroup: { user: string; messages: Message[] } | null = null;

        messages.forEach(message => {
            if (currentGroup && currentGroup.user === message.name) {
                currentGroup.messages.push(message);
            } else {
                if (currentGroup) {
                    groupedMessages.push(currentGroup);
                }
                currentGroup = { user: message.name, messages: [message] };
            }
        });

        if (currentGroup) {
            groupedMessages.push(currentGroup);
        }

        return groupedMessages;
    };

    //ham hien tin nhan sau khi duoc nhom
    const renderMessageGroup = (group: { user: string; messages: Message[] }) => {
        const isCurrentUser = group.user === username;
        return (
            <div key={group.messages[0].id} className={`message-group ${isCurrentUser ? "my-message-group" : "other-message-group"}`}>
                <div className="message-box">
                    <div className={`message-info ${isCurrentUser ? "my-message" : "other-message"}`}>
                        <span className="message-sender">{group.user}</span>
                        <span className="message-time">{addHoursToDate(group.messages[0].createAt, 7)}</span>
                    </div>
                    {group.messages.map(message => {
                        const convertedMessage = decodeURIComponent(message.mes);
                        return (
                            <div key={message.id} className={`message ${isCurrentUser ? "my-message" : "other-message"}`}>
                                {convertedMessage}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const groupedMessages = groupMessagesByUser(messages);

    return (
        <div>
            <div className="selected-user d-flex">
                <div className="d-flex">
                    <FontAwesomeIcon icon={faUserCircle} className="me-xxl-3 fa-2xl ms-4 icon" />
                    <div className="user">
                        <p>{selectedUser}</p>
                        <span>{userStatus === 'online' ? '🟢 Online' : '🔴 Offline'}</span>
                    </div>
                </div>
                <div className="other-icon d-flex">
                    <FontAwesomeIcon icon={faPhone} />
                    <FontAwesomeIcon icon={faVideo} />
                    <FontAwesomeIcon icon={faCircleInfo} />
                </div>
            </div>
            <div className="chatbox-container">
                <div className="chatbox">
                    {groupedMessages.map(renderMessageGroup)}
                    <div ref={chatEndRef} />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
