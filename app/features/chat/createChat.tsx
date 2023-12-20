"use client";
import React, { useState } from 'react';
import { HttpCreateChat } from '../../shared/HttpEndpoints/chat/createChat';

const CreateChat = () => {
  const [chatName, setChatName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const handlecreate = async () => {
    try {
      const requestTemplate = new HttpCreateChat.reqTemplate({
        name: chatName,
        chatAvatarUrl: avatarUrl,
        password: password,
      });

      const requestSender = new HttpCreateChat.requestSender(requestTemplate, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiaWtlY2hhbiIsImlhdCI6MTcwMjkwOTE2MiwiZXhwIjoxNzAyOTEyNzYyfQ.d981Gt9BIEKfCzhoh10MKUrZb1yjlVZtvVAGI-eGIjI");
      const response = await requestSender.sendRequest();
		console.log(response);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div>
	  <input
        type="text"
        placeholder="Chat Name"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlecreate}>Create Chat</button>
    </div>
  );
}

export default CreateChat;