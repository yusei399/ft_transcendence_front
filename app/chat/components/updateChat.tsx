"use client";
import React, { useState } from 'react';
import { useUpdateChatMutation } from '@/lib/redux/api';
import { HttpUpdateChat } from '@/shared/HttpEndpoints/chat';

const UpdateChat = ({chatId}: {chatId: number}) => {
  const [updateChat, { isLoading, isError }] = useUpdateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpUpdateChat.reqTemplate>({
    name: '',
    password: '',
    chatAvatarUrl: '',
    participants: []
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
	  const response = await updateChat([chatId, chatInfo]).unwrap();
      console.log('Chat updated:', response);
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  return (
    <div>
      <h1>Update Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chatInfo.name}
          onChange={(e) => setChatInfo({ ...chatInfo, name: e.target.value })}
          placeholder="Chat Name"
        />
        <input
          type="password"
          value={chatInfo.password}
          onChange={(e) => setChatInfo({ ...chatInfo, password: e.target.value })}
          placeholder="Password (optional)"
        />
        <input
          type="text"
          value={chatInfo.chatAvatarUrl}
          onChange={(e) => setChatInfo({ ...chatInfo, chatAvatarUrl: e.target.value })}
          placeholder="Avatar URL (optional)"
        />
        <button type="submit" disabled={isLoading}>
          Update Chat
        </button>
        {isError && <p>Error updating the chat.</p>}
      </form>
    </div>
  );
};

export default UpdateChat;


