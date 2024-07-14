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
    const chatEndRef = useRef<HTMLDivElement>(null);
    const lastDisplayedDateAndName = useRef<string | null>(null);


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

        const currentDateAndName = new Date(message.createAt).toDateString() + message.name;
        const shouldDisplayDateAndName = currentDateAndName !== lastDisplayedDateAndName.current;
        lastDisplayedDateAndName.current = currentDateAndName;
        const messageDate = new Date(message.createAt);
        const messageTime = `${messageDate.getHours()}:${messageDate.getMinutes()}:${messageDate.getSeconds()}`;

        return (
            <div key={message.id} className={`message-box ${message.name === username ? "my-message" : "other-message"}`}>
                {shouldDisplayDateAndName && (
                    <div className={`message-info ${message.name === username ? "my-message" : "other-message"}`}>
                        <span className="message-sender">{message.name}</span>
                        <span className="message-time">{new Date(message.createAt).toLocaleString()}</span>
                        {/* <span className="message-time" title={messageDate.toLocaleTimeString()}>{messageDate.toLocaleDateString()}</span> */}
                    </div>
                )}
                <div className={`message ${message.name === username ? "my-message" : "other-message"}`}>
                    {convertedMessage}
                </div>
            </div>
        );
    };

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
                    {messages.map(renderMessage)}
                    <div ref={chatEndRef} />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
