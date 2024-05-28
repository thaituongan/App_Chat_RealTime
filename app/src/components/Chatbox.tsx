import React, { FC } from "react";
import "../styles/style.css";

interface ChatboxProps {
    messages: string[];
}

export const Chatbox: FC<ChatboxProps> = ({ messages }) => {
    return (
        <div className="boxchat-container">
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
};
