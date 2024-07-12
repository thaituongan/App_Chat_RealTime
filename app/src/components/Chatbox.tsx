import React, { FC, useEffect, useRef } from "react";
import "../styles/style.css";

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
}

const Chatbox: FC<ChatboxProps> = ({ messages, username, selectedUser }) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const renderMessage = (message: Message) => {
        const convertedMessage = decodeURIComponent(message.mes);
        return (
            <div key={message.id} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                <div className={`message-info ${message.name === username ? "my-message" : "other-message"}`}>
                    <span className="message-sender">{message.name}</span>
                    <span className="message-time">{new Date(message.createAt).toLocaleString()}</span>
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
                <h5>{selectedUser}</h5>
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
