import React from "react";

import "../styles/style.css";
//thanh nhap tin nhan
export const InputMessage = () => {
    return (
        <div className="input-message">
            <div className="input-message-bar">
                <div className="type-message">
                    <div className="md-attach-file-screen">
                        <img className="attch-icon" alt="Attch icon" src="/MdAttachFile.png"/>
                    </div>
                    <div className="text-wrapper">Write a message...</div>
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
                    {/*nut gui tin nhan*/}
                    <div className="send-btn">
                        <div className="hi-paper-airplane-screen">
                            <img className="vector" alt="Vector" src="/HiPaperAirplane.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
