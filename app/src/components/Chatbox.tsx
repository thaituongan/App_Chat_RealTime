import React, { FC, useEffect, useRef } from "react";
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
    const chatEndRef = useRef<HTMLDivElement>(null);

    //tu dong cuon xuong de hien thi tin nhan moi
    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chatbox-container">
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                        <div className={`message ${message.name === username ? "my-message" : "other-message"}`}>
                            {message.mes}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
        </div>
    );
};
