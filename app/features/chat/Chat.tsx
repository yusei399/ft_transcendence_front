"use client";
import React, { useState } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');

    const handleChange = (event : any) => {
        setMessage(event.target.value);
    };

	const handleSubmit = () => {
		if (message.trim()) {
            console.log("Submitted:", message);
            setMessage('');
        } else {
            console.log("No message to submit");
        }
    };

    return (
        <div>
            <input
                type="text"
                className="chat_message"
                value={message}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>送信</button>
        </div>
    );
}

export default Chat;
