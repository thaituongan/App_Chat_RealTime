import React, { ChangeEvent, FC, KeyboardEvent, useState, useRef, useEffect } from "react";
import "../styles/style.css";
import EmojiPickerPortal from './EmojiPickerPortalProps';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage, faMicrophone } from "@fortawesome/free-solid-svg-icons";


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
        <div className="input-message-box">
            <div className="icon">
                <FontAwesomeIcon icon={faImage} />
                <FontAwesomeIcon icon={faMicrophone} />
            </div>
            <div className="input-message">
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
            <div className="emoji">
                <FontAwesomeIcon icon={faFaceSmile} onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                <EmojiPickerPortal
                    show={showEmojiPicker}
                    onEmojiClick={onEmojiClick}
                    onClose={() => setShowEmojiPicker(false)}
                />
            </div>
            <div className="send-btn me-2">
            <button className="btn btn-primary send-btn bg-white border-opacity-10" onClick={handleSendClick}>
                <img className="vector" alt="Send" src="/HiPaperAirplane.jpg" />
            </button>
            </div>
        </div>
    );
};

export default InputMessage;