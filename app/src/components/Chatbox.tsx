import React, { FC, useEffect, useRef } from "react";
import "../styles/style.css";
import {useDispatch} from "react-redux";
import {setChatMessages} from "../reducer/chatSlice";

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
    const chatEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addHoursToDate = (date: string, hours: number): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    };

    const renderMessage = (message: Message) => {
        const convertedMessage = decodeURIComponent(message.mes);
        const adjustedDate = addHoursToDate(message.createAt, 7);
        return (
            <div key={message.id} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                <div className={`message-info ${message.name === username ? "my-message" : "other-message"}`}>
                    <span className="message-sender">{message.name}</span>
                    <span className="message-time">{adjustedDate.toLocaleString()}</span>
                </div>
                <div className={`message ${message.name === username ? "my-message" : "other-message"}`}>
                    {convertedMessage}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="selected-user">
                <p><strong>{selectedUser}</strong></p>
                <span>{userStatus === 'online' ? '🟢 Online' : '🔴 Offline'}</span>
            </div>
            <div className="chatbox-container">
                <div className="chatbox">
                    {messages.map(renderMessage)}
                    <div ref={chatEndRef} />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
