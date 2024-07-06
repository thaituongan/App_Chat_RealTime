import React, { FC, useEffect, useRef } from "react";
import "../styles/style.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import emojiHexToEmoji from "../untils/emojiUtils";

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

    // Automatically scroll down to show the latest message
    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const renderMessage = (message: Message) => {
        const convertedMessage = emojiHexToEmoji(message.mes); // Convert emojiHex to emoji
        return (
            <div key={message.id} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                <div className={`message ${message.name === username ? "my-message" : "other-message"}`}>
                    {convertedMessage}
                </div>
                <div className="message-info">
                    <span className="message-sender">{message.name}</span>
                    {/*<span className="message-time">{new Date(message.createAt).toLocaleString()}</span>*/}
                </div>
            </div>
        );
    };

    return (
        <div className="chatbox-container">
            <div className="chatbox">
                {messages.map(message => renderMessage(message))}
                <div ref={chatEndRef} />
            </div>
        </div>
    );
};

export default Chatbox;
