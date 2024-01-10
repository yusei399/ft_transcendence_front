'use client';
import Loading from '@/app/components/global/Loading';
import {setNotification, userIdSelector} from '@/lib/redux';
import {
  useAllUsersQuery,
  useGetFriendQuery,
  useGetInvitationsQuery,
  useRemoveFriendMutation,
  useSendInvitationMutation,
} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {
  clearEventToHandle,
  clearInvitationToRefresh,
  friendEventToHandleSelector,
  needFriendInvitationRefreshSelector,
} from '@/lib/redux/slices/invitationSlice';
import {RepeatIcon, StarIcon} from '@chakra-ui/icons';
import {Avatar, Button, Card, CardBody, CardHeader, Flex, HStack, Heading} from '@chakra-ui/react';
import {useEffect} from 'react';

function FriendList() {
  const {data, error, isLoading} = useAllUsersQuery([]);
  const {
    data: friendData,
    error: friendError,
    isLoading: FriendIsLoading,
    refetch: friendRefetch,
  } = useGetFriendQuery([]);
  const {
    data: invitationData,
    isLoading: invitationIsLoading,
    refetch: invitationRefetch,
  } = useGetInvitationsQuery(['friend']);
  const [sendInvitation] = useSendInvitationMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const current_userId = useAppSelector(userIdSelector);
  const needRefresh = useAppSelector(needFriendInvitationRefreshSelector);
  const eventToHandle = useAppSelector(friendEventToHandleSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needRefresh) {
      invitationRefetch();
      dispatch(clearInvitationToRefresh());
    }
    if (eventToHandle) {
      friendRefetch();
      dispatch(clearEventToHandle());
    }
  }, [needRefresh, eventToHandle]);

  if (isLoading || FriendIsLoading || invitationIsLoading) return <Loading />;
  if (error) console.log(error);
  if (friendError) console.log(friendError);
  if (data === undefined || friendData === undefined) return <Loading />;

  const users = data.users.filter(user => user.userId !== current_userId);
  const invitationAlreadySent =
    invitationData?.invitations.map(invitation => {
      if (invitation.sender.userId === current_userId) return invitation.receiver.userId;
    }) ?? [];
  const invitationAlreadyReceived =
    invitationData?.invitations.map(invitation => {
      if (invitation.receiver.userId === current_userId) return invitation.sender.userId;
    }) ?? [];

  const handleSendFriendInvitation = async (targetUserId: number) => {
    try {
      await sendInvitation(['friend', {targetUserId}]).unwrap();
      dispatch(
        setNotification({
          status: 'info',
          title: 'Friend invitation sent!',
          description: 'Friend invitation sent successfully',
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'error',
          title: 'Error',
          description: 'Error at sending friend invitation',
        }),
      );
      console.log(error);
    }
  };

  const handleRemoveFriend = async (friendId: number) => {
    try {
      await removeFriend([{friendId}]).unwrap();
      dispatch(
        setNotification({
          status: 'warning',
          title: 'Friend removed!',
          description: 'Friend removed successfully',
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'error',
          title: 'Error',
          description: 'Error at removing friend',
        }),
      );
      console.log(error);
    }
  };

  return (
    <HStack spacing="8px" wrap="wrap">
      {users.map(user => {
        const {userId, nickname, avatarUrl} = user;
        const isFriend = friendData.friendsProfiles.some(p => p.userId === userId) ?? false;
        const isOnline = isFriend
          ? friendData.friendsProfiles.find(p => p.userId === userId)?.isOnline
          : user.isOnline;
        return (
          <Card key={userId} padding="8px" alignItems={'center'} rowGap="6px">
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
              <Avatar boxSize="80px" src={avatarUrl ?? '/assets/sample.png'} />
            </CardBody>
            {isFriend ? (
              <Button colorScheme="red" onClick={() => handleRemoveFriend(userId)}>
                フレンド削除
              </Button>
            ) : (
              <Button
                colorScheme="green"
                onClick={() => handleSendFriendInvitation(userId)}
                isDisabled={
                  !!invitationAlreadyReceived.find(id => id === user.userId) ||
                  !!invitationAlreadySent.find(id => id === user.userId)
                }>
                フレンド申請
              </Button>
            )}
          </Card>
        );
      })}
    </HStack>
  );
}

export default FriendList;
