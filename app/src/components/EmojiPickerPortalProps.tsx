import React from 'react';
import ReactDOM from 'react-dom';
import Picker from 'emoji-picker-react';

interface EmojiPickerPortalProps {
    show: boolean;
    onEmojiClick: (emojiObject: any) => void;
    onClose: () => void;
}

const EmojiPickerPortal: React.FC<EmojiPickerPortalProps> = ({ show, onEmojiClick, onClose }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="emoji-picker-overlay" onClick={onClose}>
            <div className="emoji-picker-dialog" onClick={(e) => e.stopPropagation()}>
                <Picker onEmojiClick={onEmojiClick} />
            </div>
        </div>,
        document.getElementById('emoji-picker-portal')!
    );
};

export default EmojiPickerPortal;
