import React from 'react';
import {useState} from "react";
import {InputMessage} from "./inputMessage";
import {Chatbox} from "./Chatbox";
import "../styles/style.css";
interface ChatProps {
    name: string;
}

function Chat({ name }: ChatProps) {
    // biến nhập tin nhắn
    const [InputMess, setInpuMess] = useState('')
    const [message, setMessage] = useState([])
    return (
        <div className='chat-container'>
            <h1>{name} start chat!</h1>

            {/*//khung nhap tin nhan*/}
                <Chatbox/>
                <InputMessage/>


        </div>
    );
}

export default Chat;
