"use client";
import React, { useState } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleChange = (event : any) => {
        setMessage(event.target.value);
    };

	const handleSubmit = () => {
		if (message.trim()) {
            console.log("Submitted:", message);
			setMessages([...messages, message]);
            setMessage('');
        } else {
            console.log("No message to submit");
        }
    };

    return (
		<div>
			{messages?.map((message: any) => (
				<div key={message}>
					<p>
						{message}
					</p>
				</div>
			))}
            <input
                type="text"
                className="chat_message"
                value={message}
                onChange={handleChange}
            />
			<button onClick={handleSubmit} style={{margin: "20px"}}>送信</button>
        </div>
    );
}

export default Chat;
