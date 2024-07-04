import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import "../styles/style.css";
import Picker from 'emoji-picker-react';

interface InputMessageProps {
    input: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
}

export const InputMessage: FC<InputMessageProps> = ({ input, onInputChange, onSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSendMessage();
        }
    };


    const onEmojiClick = (emojiObject: any, event: any) => {
        console.log('Emoji Object:', emojiObject); 
        const emojiUnified = emojiObject.unified;
        if (emojiUnified) {
            // Chuyển đổi chuỗi hex thành emoji thực tế
            const emoji = String.fromCodePoint(...emojiUnified.split('-').map((code: string) => parseInt(code, 16)));
            // Thêm đoạn mã emoji vào giá trị đầu vào
            console.log(`:${emojiUnified}:`);
            const newInputValue = input + emoji;
            const customEvent = {
                target: { value: newInputValue }
            } as ChangeEvent<HTMLInputElement>;
            onInputChange(customEvent);
        } else {
            console.error("Không tìm thấy thuộc tính unified trong emojiObject", emojiObject);
        }
        setShowEmojiPicker(false);
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
                            value={input}
                            onChange={onInputChange}
                            onKeyPress={handleKeyPress}
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
                        <button className="btn btn-primary send-btn bg-white border-opacity-10 " onClick={onSendMessage}>
                            <img className="vector" alt="Send" src="/HiPaperAirplane.jpg"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputMessage;