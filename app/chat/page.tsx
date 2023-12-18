'use client';

import {useAppSelector} from '@/lib/redux/hook';
import {jwtSelector} from '@/lib/redux';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {SocketService} from '@/services/websocket/socketService';
import {MissingStaticPage} from 'next/dist/shared/lib/utils';

export default function IndexPage() {
  const authToken = useAppSelector(jwtSelector);
  const router = useRouter();

  useEffect(() => {
    if (!authToken) router.push('/auth');
  }, [authToken]);

  if (!authToken) return <div>Redirecting...</div>;

  const sendMessage = () => {
    const msg = 'hello world';
    SocketService.emit('sendMessage', {
      chatId: 1,
      messageContent: msg,
    });
  };

  return (
    <>
      <button onClick={sendMessage}>send message</button>
    </>
  );
}
