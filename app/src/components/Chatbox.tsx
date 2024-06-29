import React, { FC } from "react";
import "../styles/style.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
    const username = useSelector((state: RootState) => state.user.username);
    return (
        <div className="chatbox-container">
            <div className="chatbox">
                {messages.map((message, index) => (
                    // <div key={index} className="message">
                    <div key={index} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                        {/*<div className="message-header">*/}
                        {/*    <span className="message-author">{message.name}</span>*/}
                        {/*    <span className="message-timestamp">{new Date(message.createAt).toLocaleString()}</span>*/}
                        {/*</div>*/}
                        <div className={`message ${message.name === username ? "my-message" : "other-message"}`}>
                            {message.mes}
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

