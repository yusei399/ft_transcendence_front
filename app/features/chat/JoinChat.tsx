"use client";
import React, { useState, useContext } from 'react';
import { HttpJoinChat } from '../../shared/HttpEndpoints/chat/joinChat';

const JoinChat = () => {
  const [chatId, setChatId] = useState('');
  const [password, setPassword] = useState('');

  const handleJoinChat = async () => {
    try {
      const requestTemplate = new HttpJoinChat.reqTemplate(password);
      const requestSender = new HttpJoinChat.requestSender(Number(chatId), requestTemplate, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5pY2tuYW1lIjoidGVzdCIsImlhdCI6MTcwMjkxMDcyNiwiZXhwIjoxNzAyOTE0MzI2fQ.-HnWtxe1lKKaq2MKOhc-3kBymq5Qz5-x6xjXvm-plvA");
      const response = await requestSender.sendRequest(); 
		console.log(response);
		console.log("Join Chat");
    } catch (error) {
      console.error('Error joining chat:', error);
    }
  };

  return (
    <div>
      <h1>Join Chat</h1>
	  <input
        type="text"
        placeholder="Chat ID"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
	  <button onClick={handleJoinChat}>Join Chat</button>
    </div>
  );
}

export default JoinChat;