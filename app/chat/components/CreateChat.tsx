'use client';
import React, {useState} from 'react';
import {HttpCreateChat} from '@/shared/HttpEndpoints/chat';
import {useCreateChatMutation} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';

const CreateChat = () => {
  const [createChat, {isLoading, error}] = useCreateChatMutation();
  const [chatInfo, setChatInfo] = useState<HttpCreateChat.reqTemplate>({
    name: '',
    chatAvatarUrl: undefined,
    password: undefined,
  });

  const handlecreate = async () => {
    try {
      const res = createChat([chatInfo]).unwrap();
      console.log(res);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  if (isLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <div>
      <input
        type="text"
        placeholder="Chat Name"
        value={chatInfo.name}
        onChange={e => setChatInfo({...chatInfo, name: e.target.value})}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={chatInfo.chatAvatarUrl}
        onChange={e => setChatInfo({...chatInfo, chatAvatarUrl: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={chatInfo.password}
        onChange={e => setChatInfo({...chatInfo, password: e.target.value})}
      />
      <button onClick={handlecreate}>Create Chat</button>
    </div>
  );
};

export default CreateChat;
