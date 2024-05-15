import React from 'react';

interface ChatProps {
    name: string;
}

function Chat({ name }: ChatProps) {
    return (
        <div>
            <h1>{name} start chat!</h1>
        </div>
    );
}

export default Chat;
