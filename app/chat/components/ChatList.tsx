'use client';

import {useGetAllChatsQuery} from '@/lib/redux/api';
import {CheckCircleIcon, LockIcon} from '@chakra-ui/icons';
import {Card, CardBody, CardHeader, Heading, Avatar, HStack} from '@chakra-ui/react';
import Loading from '@/app/components/global/Loading';
import Link from 'next/link';

function ChatList() {
  const {data, error, isLoading} = useGetAllChatsQuery([]);

  if (error) console.log(error);
  if (data === undefined) return isLoading ? <Loading /> : null;

  return (
    <>
      {data.chats.map(chat => {
        const {chatId, chatName, chatAvatarUrl, hasPassword, participation} = chat;
        const hasJoined = !!participation;
        return (
          <Link key={chatId} href={`/chat/${chatId}`} scroll={false}>
            <Card w="160px" overflow="hidden" padding={'6px'}>
              <CardHeader paddingBottom={0}>
                <HStack justifyContent={'space-between'}>
                  <LockIcon color={hasPassword ? 'red.500' : 'gray.500'} />
                  <Heading size="md" wordBreak={'break-word'}>
                    {chatName}
                  </Heading>
                  <CheckCircleIcon color={hasJoined ? 'green.500' : 'gray.500'} />
                </HStack>
              </CardHeader>
              <CardBody alignSelf={'center'}>
                <Avatar boxSize="60px" src={chatAvatarUrl ?? '/assets/sample_chat.png'} />
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
export default ChatList;
