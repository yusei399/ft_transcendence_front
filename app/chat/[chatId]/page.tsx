'use client';

import {useParams, useRouter} from 'next/navigation';
import ChatContent from './components/ChatContent';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setNotification} from '@/lib/redux';
import {useGetAllChatsQuery} from '@/lib/redux/api';
import Loading from '@/app/components/global/Loading';
import JoinChat from './components/JoinChat';
import {Avatar, Flex, Heading} from '@chakra-ui/react';
import UpdateChat from './components/updateChat';
import LeaveChat from './components/leaveChat';
import Link from 'next/link';
import {ArrowLeftIcon} from '@chakra-ui/icons';
import ChatMemberList from './components/ChatMemberList';

export default function IndexPage(): JSX.Element {
  const params = useParams<{chatId: string}>();
  const {data, error, isLoading} = useGetAllChatsQuery([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const chatId = Number(params.chatId);
  const chat = data?.chats.find(chat => chat.chatId === chatId);

  useEffect(() => {
    if (data && !chat) {
      router.push('/chat');
      dispatch(
        setNotification({
          title: 'Invalid chat id',
          description: isNaN(chatId) ? 'Chat id is not a number' : 'Access denied',
          status: 'error',
        }),
      );
    }
  }, [data, chat, chatId, dispatch, router]);

  if (isLoading || !chat) return <Loading />;
  const {chatName, chatAvatarUrl, hasPassword, participation} = chat;
  if (error) console.log(error);

  const hasJoined = !!participation;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAdmin = participation?.role === 'ADMIN' || participation?.role === 'OWNER';
  const isOwner = participation?.role === 'OWNER';

  return (
    <Flex flexDir="column" gap="20px" height="100%" width="80%">
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/chat" scroll={false}>
          <ArrowLeftIcon color={'blue.500'} fontSize={'2.5em'}>
            Back
          </ArrowLeftIcon>
        </Link>
        {hasJoined && (
          <>
            <ChatMemberList chatId={chatId} />
            <UpdateChat chatId={chatId} isOwner={isOwner} />
          </>
        )}
        <Avatar size="md" name={chatName} src={chatAvatarUrl ?? '/assets/sample_chat.png'} />
        <Heading>{chatName}</Heading>
        {hasJoined ? (
          <LeaveChat chatId={chatId} />
        ) : (
          <JoinChat chatId={chatId} hasPassword={hasPassword} />
        )}
      </Flex>
      {hasJoined && <ChatContent chatId={chatId} />}
    </Flex>
  );
}
