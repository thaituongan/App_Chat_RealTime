import React from 'react';
import {useState} from "react";
interface ChatProps {
    name: string;
}

function Chat({ name }: ChatProps) {
    // biến nhập tin nhắn
    const [inputMess, setInpuMess] = useState('')
    const [message, setMessage] = useState([])
    return (
        <div className='chat-container'>
            <h1>{name} start chat!</h1>

            {/*tạo list tin nhắn*/}
            <ul>
                <li></li>
            </ul>

            {/*//khung nhap tin nhan*/}
            <input type='text' />

            {/*//button send tin nhan*/}
            <button>Send</button>

        </div>
    );
}

export default Chat;
