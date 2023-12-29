'use client';

import Loading from '@/app/components/global/Loading';
import {useGetAllChatsQuery} from '@/lib/redux/api';

function ChatList() {
  const {data, isLoading, error} = useGetAllChatsQuery([]);

  if (isLoading) return <Loading />;
  if (error) console.log(error);
  if (!data) return <div>no data</div>;

  return (
    <>
      {data.chats.map(chat => (
        <div key={chat.chatId}>
          <p>chatName: {chat.name}</p>
          <p>chatAvatar: {chat.chatAvatarUrl}</p>
          <p>hasPassword: {chat.hasPassword}</p>
          {chat.participants.map(participant => (
            <div key={participant.userProfile.userId}>
              <p>id: {participant.userProfile.userId}</p>
              <p>nickname: {participant.userProfile.nickname}</p>
              <p>avartar: {participant.userProfile.avatarUrl}</p>
              {participant.blockedUntil && (
                <p>blocked until: {participant.blockedUntil.toDateString()}</p>
              )}
              {participant.mutedUntil && (
                <p>muted until: {participant.mutedUntil.toDateString()}</p>
              )}
              {participant.hasLeaved && <p>hasLeaved: {participant.hasLeaved}</p>}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
export default ChatList;
