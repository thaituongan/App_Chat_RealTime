import React, { FC } from "react";
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
}

export const Chatbox: FC<ChatboxProps> = ({ messages }) => {
    return (
        <div className="chatbox-container">
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <div className="message-header">
                            <span className="message-author">{message.name}</span>
                            <span className="message-timestamp">{new Date(message.createAt).toLocaleString()}</span>
                        </div>
                        <div className="message-content">{message.mes}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
