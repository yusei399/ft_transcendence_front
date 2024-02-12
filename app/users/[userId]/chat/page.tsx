'use client';
import Loading from '@/app/components/global/Loading';
import {ErrorType, useGetAllDirectMessageQuery, useGetMeQuery} from '@/lib/redux/api';
import {useAppDispatch, setNotification} from '@/lib/redux';
import {SocketService} from '@/services/websocket/socketService';
import {ArrowLeftIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Text,
  HStack,
  List,
  ListItem,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function IndexPage() {
  const params = useParams<{userId: string}>();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = Number(params.userId);
  const {data: me} = useGetMeQuery([]);
  const {data, error} = useGetAllDirectMessageQuery([userId], {
    skip: isNaN(userId),
  });
  const [toSend, setToSend] = useState('');

  const typedErr = error as ErrorType;
  const isBlocked = typedErr?.status === 403 && typedErr?.data.includes('you are blocked');
  const hasBlockedMe = typedErr?.status === 403 && typedErr?.data.includes('user blocked');

  useEffect(() => {
    if (hasBlockedMe || isBlocked) return;
    if (me && me.userId === userId) {
      router.push('/');
      dispatch(
        setNotification({
          title: 'Invalid user id',
          description: 'Cannot send message to yourself',
          status: 'error',
        }),
      );
    } else if (isNaN(userId) || error) {
      router.push('/');
      dispatch(
        setNotification({
          title: 'Invalid user id',
          description: isNaN(userId) ? 'user id is not a number' : 'Access denied',
          status: 'error',
        }),
      );
    }
  }, [userId, error, me, userId, hasBlockedMe, isBlocked]);

  if (isBlocked || hasBlockedMe)
    return (
      <Flex flexDir="column" alignSelf="center" gap="20px" align="center">
        <Heading>
          {isBlocked ? 'You have been blocked by this user' : 'You have blocked this user'}
        </Heading>
        <Link href={`/users/${userId}`} scroll={false}>
          <Button>Back to user profile</Button>
        </Link>
      </Flex>
    );

  if (!data || !me || me.userId === userId) return <Loading />;

  const {messages, userProfile} = data;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toSendTrimmed = toSend.trim();
    if (toSendTrimmed) {
      SocketService.emit('sendDirectMessage', {
        userId: userProfile.userId,
        messageContent: toSendTrimmed,
      });
    } else {
      dispatch(
        setNotification({
          title: 'Invalid message',
          description: 'Message cannot be empty',
          status: 'error',
        }),
      );
    }
    setToSend('');
  };

  return (
    <Flex flexDir="column" gap="20px" height="100%" width="80%">
      <Flex justifyContent="space-between" alignItems="center">
        <Link href={`/users/${userId}`} scroll={false}>
          <ArrowLeftIcon color={'blue.500'} fontSize={'2.5em'}>
            Back
          </ArrowLeftIcon>
        </Link>
        <Avatar
          size="md"
          name={userProfile.nickname}
          src={userProfile.avatarUrl ?? '/assets/sample.png'}
        />
        <Heading>{userProfile.nickname}</Heading>
      </Flex>
      <List spacing={2} overflowY="auto" height="100%">
        {messages.map(message => {
          const {messageId, senderId, createdAt, messageContent} = message;
          const isSender = senderId === me.userId;
          const profile = isSender ? me : userProfile;
          const {nickname, avatarUrl} = profile;
          return (
            <ListItem
              key={messageId}
              minW="50%"
              w="fit-content"
              maxW="80%"
              borderWidth="2px"
              borderRadius="lg"
              borderColor={isSender ? 'azure' : 'black'}
              bgColor={isSender ? 'teal' : 'azure'}
              textAlign={isSender ? 'right' : 'left'}
              marginLeft={isSender ? 'auto' : 'initial'}
              overflow="hidden"
              padding="12px">
              <HStack flexDir={isSender ? 'row-reverse' : 'row'}>
                <Avatar src={avatarUrl ?? '/assets/sample.png'} width="40px" height="40px" />
                <Text fontSize="lg" fontWeight={800}>
                  {isSender ? 'You' : nickname}:
                </Text>
              </HStack>
              <Text fontSize="lg" padding={isSender ? '0 8px 0 0' : '0 0 0 8px'}>
                {messageContent}
              </Text>
              <small>{new Date(createdAt).toLocaleString()}</small>
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={e => handleSubmit(e)}>
        <HStack>
          <FormControl isRequired>
            <Input
              type="text"
              name="chat_message"
              value={toSend}
              onChange={e => setToSend(e.target.value)}
              autoFocus={true}
            />
          </FormControl>
          <Button type="submit" isDisabled={!toSend}>
            送信
          </Button>
        </HStack>
      </form>
    </Flex>
  );
}
