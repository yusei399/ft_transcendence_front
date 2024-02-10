'use client';

import Loading from '@/app/components/global/Loading';
import InvitationsList from '@/app/components/invitation/Invitation';
import SendInvitationButton from '@/app/components/invitation/SendInvitationButton';
import MatchHistory from '@/app/game/components/MatchHistory';
import {useAppDispatch, useAppSelector, setNotification, userIdSelector} from '@/lib/redux';
import {
  ErrorType,
  useBlockUserMutation,
  useGetUserQuery,
  useRemoveFriendMutation,
  useUnblockUserMutation,
} from '@/lib/redux/api';
import {RepeatIcon, StarIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import {format} from 'date-fns';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function IndexPage() {
  const params = useParams<{userId: string}>();

  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(userIdSelector) as number;
  const router = useRouter();
  const userId = Number(params.userId);
  const {data, error, isLoading} = useGetUserQuery([userId], {
    skip: isNaN(userId),
  });
  const [removeFriend] = useRemoveFriendMutation();
  const [blockReq] = useBlockUserMutation();
  const [unBlockReq] = useUnblockUserMutation();

  useEffect(() => {
    if (currentUserId === userId) {
      router.replace('/');
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
  }, [userId, error]);

  if ((error as ErrorType)?.status === 403)
    return <Heading>You have been blocked by this user</Heading>;

  if (isLoading || !data || currentUserId === userId) return <Loading />;

  const {nickname, avatarUrl, isOnline, isBlocked, hasBlockedMe, isFriend, status, achievements} =
    data;

  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), 'PPPpp');
  };

  const blockUnblock = async () => {
    try {
      if (isBlocked) {
        await unBlockReq([userId]).unwrap();
        dispatch(
          setNotification({
            title: 'Unblock',
            description: `You have unblocked this ${nickname}`,
            status: 'success',
          }),
        );
        return;
      }
      await blockReq([userId]).unwrap();
      dispatch(
        setNotification({
          title: 'Block',
          description: `You have blocked ${nickname}`,
          status: 'warning',
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          title: 'Block',
          description: `Cannot block ${nickname}`,
          status: 'error',
        }),
      );
    }
  };

  const handleRemoveFriend = async (friendId: number, friendNickname: string) => {
    try {
      await removeFriend([{friendId}]).unwrap();
      dispatch(
        setNotification({
          status: 'warning',
          title: `Friend removed!`,
          description: `${friendNickname} has been removed from your friend list.`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'error',
          title: 'Error',
          description: `Error at removing friend`,
        }),
      );
      console.log(error);
    }
  };

  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent="space-around"
      width="100%"
      height="100%">
      <Box overflowY="auto" height="100%">
        <MatchHistory userId={userId} />
      </Box>
      <Flex
        flexFlow="wrap"
        overflowY="auto"
        height="100%"
        padding="8px"
        alignItems="center"
        justify="center">
        <Card
          key={userId}
          alignItems={'center'}
          rowGap="6px"
          padding="8px"
          height="fit-content"
          width="fit-content">
          <CardHeader padding={0}>
            <Flex alignItems="center" justifyContent="space-around" gap="8px">
              <RepeatIcon
                color={isOnline ? 'green.500' : 'red.500'}
                fontSize={isOnline ? '1.4em' : '1.2em'}
              />
              <Heading size="md" maxWidth={'80px'}>
                {nickname}
              </Heading>
              <StarIcon
                color={isFriend ? 'yellow.500' : 'gray.500'}
                fontSize={isFriend ? '1.4em' : '1.2em'}
              />
            </Flex>
          </CardHeader>
          <CardBody padding="6px">
            <Flex flexFlow="column" gap="12px">
              <Avatar boxSize="80px" src={avatarUrl ?? '/assets/sample.png'} margin="auto" />
              {isFriend && (
                <Text
                  fontSize="1.4em"
                  fontStyle="italic"
                  textAlign="center"
                  color="teal.600"
                  fontWeight="700">
                  {
                    {
                      offline: 'Offline',
                      chilling: 'Chilling',
                      onChat: 'Chatting',
                      waitingForGame: 'Waiting for game',
                      onGame: 'Playing game',
                    }[status]
                  }
                </Text>
              )}
              <VStack spacing={2} align="stretch">
                <Text fontSize="md" fontWeight="semibold">
                  Achievements
                </Text>
                {achievements && achievements.length > 0 ? (
                  achievements.map(achievement => (
                    <HStack key={achievement.achievementId}>
                      <Badge colorScheme="green">{achievement.name}</Badge>
                      <Text fontSize="sm">{formatDate(achievement.obtainedAt)}</Text>
                    </HStack>
                  ))
                ) : (
                  <Text>No achievements yet</Text>
                )}
              </VStack>
              <Link href={`/users/${userId}/chat`} scroll={false}>
                <Button colorScheme="orange" width={'100%'} isDisabled={hasBlockedMe || isBlocked}>
                  Direct Messages
                </Button>
              </Link>
              {(isFriend && (
                <Button colorScheme="red" onClick={() => handleRemoveFriend(userId, nickname)}>
                  フレンド削除
                </Button>
              )) || <SendInvitationButton invitationKind="friend" userId={userId} />}
              <Button
                colorScheme={isBlocked ? 'green' : 'red'}
                onClick={blockUnblock}
                isDisabled={hasBlockedMe && !isBlocked}>
                {isBlocked ? 'Unblock' : hasBlockedMe ? 'Blocked' : 'Block'}
              </Button>
            </Flex>
          </CardBody>
        </Card>
        <InvitationsList userId={userId} />
      </Flex>
    </Flex>
  );
}
