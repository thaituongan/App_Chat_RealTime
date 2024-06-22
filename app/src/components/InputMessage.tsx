import React, { ChangeEvent, FC } from "react";
import "../styles/style.css";

interface InputMessageProps {
    input: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
}

export const InputMessage: FC<InputMessageProps> = ({ input, onInputChange, onSendMessage }) => {
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
                        />
                    </div>
                    <div className="option-frame">
                        <div className="fomat-mess">
                            <div className="icon">
                                <img className="happy" alt="Happy" src="/happy-1.png"/>
                            </div>
                            <div className="box">
                                <img className="microphone" alt="Microphone" src="/Microphone%201.png"/>
                            </div>
                        </div>
                        {/* Send button */}
                        <button className="btn btn-primary send-btn bg-white border-opacity-10 " onClick={onSendMessage}>
                            <img className="vector" alt="Send" src="/HiPaperAirplane.jpg"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
