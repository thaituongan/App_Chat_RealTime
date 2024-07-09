import React, { ChangeEvent, FC, KeyboardEvent, useState, useRef, useEffect } from "react";
import "../styles/style.css";
import EmojiPickerPortal from './EmojiPickerPortalProps';

interface InputMessageProps {
    input: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
}

export const InputMessage: FC<InputMessageProps> = ({ input, onInputChange, onSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [displayInputValue, setDisplayInputValue] = useState<string>(input);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSendClick();
        }
    };

    useEffect(() => {
        setDisplayInputValue(input);
    }, [input]);

    const onEmojiClick = (emojiObject: any) => {
        const emoji = String.fromCodePoint(...emojiObject.unified.split('-').map((hex: string) => parseInt(hex, 16)));
        const cursorPosition = inputRef.current?.selectionStart ?? displayInputValue.length;
        const newDisplayValue = displayInputValue.slice(0, cursorPosition) + emoji + displayInputValue.slice(cursorPosition);

        setDisplayInputValue(newDisplayValue);
        const message = { target: { value: newDisplayValue } } as ChangeEvent<HTMLInputElement>;
        onInputChange(message);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayInputValue(event.target.value);
        onInputChange(event);
    };

    const handleSendClick = () => {
        onSendMessage();
        setDisplayInputValue('');
        setShowEmojiPicker(false);
    };

    return (
        <div className="input-message-container">
            <div className="input-message">
                <div className="input-message-bar">
                    <div className="type-message">
                        <div className="md-attach-file-screen">
                            <img className="attch-icon" alt="Attach icon" src="/MdAttachFile.png" />
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
                                <EmojiPickerPortal
                                    show={showEmojiPicker}
                                    onEmojiClick={onEmojiClick}
                                    onClose={() => setShowEmojiPicker(false)}
                                />
                            </div>
                            <div className="box">
                                <img className="microphone" alt="Microphone" src="/Microphone%201.png" />
                            </div>
                        </div>
                        <button className="btn btn-primary send-btn bg-white border-opacity-10" onClick={handleSendClick}>
                            <img className="vector" alt="Send" src="/HiPaperAirplane.jpg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputMessage;