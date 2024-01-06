'use client';
import React, {useState} from 'react';
import {useUpdateChatMutation, useGetChatInfoQuery} from '@/lib/redux/api';
import {HttpUpdateChat} from '@/shared/HttpEndpoints/chat';
import Loading from '@/app/components/global/Loading';

const UpdateChat = ({chatId}: {chatId: number}) => {
  const {data, isLoading: queryLoading, error} = useGetChatInfoQuery([chatId]);
  const [updateChat, {isLoading, isError}] = useUpdateChatMutation();
  const [updateInfo, setUpdateInfo] = useState<HttpUpdateChat.reqTemplate>({
    name: undefined,
    password: undefined,
    chatAvatar: undefined,
    participants: [],
  });

  if (queryLoading || isLoading) return <Loading />;
  if (error) console.log(error);
  if (!data) return <div>no data</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateChat([chatId, updateInfo]).unwrap();
      console.log('Chat updated:', response);
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  const {name, chatAvatarUrl, hasPassword, participants} = data;

  return (
    <div>
      <h1>Update Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updateInfo.name}
          //placeholder={name}
          onChange={e => setUpdateInfo({...updateInfo, name: e.target.value})}
        />
        <input
          type="password"
          value={updateInfo.password}
          onChange={e => setUpdateInfo({...updateInfo, password: e.target.value})}
          placeholder="Password (optional)"
        />
        <input
          type="file"
          onChange={e => setUpdateInfo({...updateInfo, chatAvatar: e.target.files?.[0]})}
          placeholder="Avatar (optional)"
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
