"use client";
import React, { useState } from 'react';

type Message = {
  username: string;
  avatarUrl: string;
  text: string;
};

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        if (message.trim()) {
            const newMessage = {
                username: "User1", // ここに実際のユーザー名を設定
                avatarUrl: "https://image.itmedia.co.jp/news/articles/2202/14/koya_avatarme.jpg", // ここに実際のアバターのURLを設定
                text: message
            };
            console.log("Submitted:", message);
            setMessages([...messages, newMessage]);
            setMessage('');
        } else {
            console.log("No message to submit");
        }
    };

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <img src={message.avatarUrl} alt={message.username} style={{ width: "30px", height: "30px" }} />
                    <strong>{message.username}</strong>
                    <p>{message.text}</p>
                </div>
            ))}
            <input
                type="text"
                className="chat_message"
                value={message}
                onChange={handleChange}
            />
            <button onClick={handleSubmit} style={{ margin: "20px" }}>送信</button>
        </div>
    );
}

export default Chat;
