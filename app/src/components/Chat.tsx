import React from 'react';
import {useState} from "react";
import {InputMessage} from "./inputMessage";
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

            {/*tạo list tin nhắn*/}
            <ul>
                <li></li>
            </ul>

            {/*//khung nhap tin nhan*/}
            <InputMessage/>

        </div>
    );
}

export default Chat;
