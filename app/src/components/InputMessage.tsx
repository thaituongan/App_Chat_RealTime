import React, { ChangeEvent, FC, KeyboardEvent, useState, useRef, useEffect } from "react";
import "../styles/style.css";
import Picker from 'emoji-picker-react';
import emojiHexToEmoji from "../untils/emojiUtils";
import { textToUnicode } from "../untils/unicodeUtils";

interface InputMessageProps {
    input: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: (message: string) => void;
}

export const InputMessage: FC<InputMessageProps> = ({ input, onInputChange, onSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [displayInputValue, setDisplayInputValue] = useState<string>(input);
    const [sendMessageValue, setSendMessageValue] = useState<string>(input); 
    const inputRef = useRef<HTMLInputElement>(null);
    

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSendClick();
        }
    };

    useEffect(() => {
        setDisplayInputValue(input);
    }, [input]);

     const onEmojiClick = (emojiObject: any, event: any) => {
        const emojiUnified = emojiObject.unified;
        if (emojiUnified) {
            const emoji = String.fromCodePoint(...emojiUnified.split('-').map((code: string) => parseInt(code, 16)));

            const cursorPosition = inputRef.current?.selectionStart ?? displayInputValue.length;

            const newDisplayValue =
                displayInputValue.slice(0, cursorPosition) + emoji + displayInputValue.slice(cursorPosition);

            setDisplayInputValue(newDisplayValue);

            const emojiHex = `:${emojiUnified}:`;
            const newInputValue =
                input.slice(0, cursorPosition) + emojiHex + input.slice(cursorPosition);

            const message = {
                target: { value: newInputValue }
            } as ChangeEvent<HTMLInputElement>;
            onInputChange(message);
        } else {
            console.error("Không tìm thấy thuộc tính unified trong emojiObject", emojiObject);
        }
        setShowEmojiPicker(false);
    };


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // setDisplayInputValue(event.target.value);
        const newValue = event.target.value;
        setDisplayInputValue(newValue);
        
        // Chuyển đổi văn bản nhập thành mã Unicode
        const unicodeValue = textToUnicode(newValue);
        setSendMessageValue(unicodeValue);
        console.log(unicodeValue);
        setSendMessageValue(event.target.value);
        onInputChange(event);
    };

    const handleSendClick = () => {
        // Xử lý khi người dùng gửi tin nhắn
        onSendMessage(sendMessageValue);
        setDisplayInputValue('');
        setSendMessageValue(''); 
    };

    return (
        <div className="input-message-container">
            <div className="input-message">
                <div className="input-message-bar">
                    <div className="type-message">
                        <div className="md-attach-file-screen">
                            <img className="attch-icon" alt="Attach icon" src="/MdAttachFile.png"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="form-control text-wrapper"
                            value={displayInputValue}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            ref={inputRef}
                        />
                    </div>
                    <div className="option-frame">
                        <div className="fomat-mess">
                            <div className="icon">
                                <img
                                    className="happy"
                                    alt="Happy"
                                    src="/happy-1.png"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                />
                                {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
                            </div>
                            <div className="box">
                                <img className="microphone" alt="Microphone" src="/Microphone%201.png"/>
                            </div>
                        </div>
                        <button className="btn btn-primary send-btn bg-white border-opacity-10 " onClick={handleSendClick}>
                            <img className="vector" alt="Send" src="/HiPaperAirplane.jpg"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputMessage;