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
  clearInvitationToRefresh,
  needFriendInvitationRefreshSelector,
} from '@/lib/redux/slices/invitationSlice';
import {Avatar, Button, Card, CardBody, CardHeader, HStack, Heading} from '@chakra-ui/react';
import {useEffect} from 'react';

function FriendList() {
  const {currentData, error, isFetching, refetch} = useAllUsersQuery([]);
  const {
    currentData: friendData,
    error: friendError,
    isFetching: FriendIsFetching,
    refetch: friendRefetch,
  } = useGetFriendQuery([]);
  const {currentData: invitationData, isFetching: invitationIsFetching} = useGetInvitationsQuery([
    'friend',
  ]);
  const [sendInvitation] = useSendInvitationMutation();
  const [removeFriend] = useRemoveFriendMutation();


  const current_userId = useAppSelector(userIdSelector);
  const needRefresh = useAppSelector(needFriendInvitationRefreshSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needRefresh) {
      refetch();
      friendRefetch();
      dispatch(clearInvitationToRefresh());
    }
  }, [needRefresh]);

  if (isFetching || FriendIsFetching || invitationIsFetching) return <Loading />;
  if (error) console.log(error);
  if (friendError) console.log(friendError);
  if (!currentData) return <div>You doesn't even exist</div>;

  const users = currentData.users.filter(user => user.userId !== current_userId);
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
          status: 'success',
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
          status: 'success',
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
    <HStack spacing="8px">
      {users.map(user => {
        const {userId, nickname, avatarUrl} = user;
        const isFriend = friendData
          ? friendData.friendsProfiles.some(p => p.userId === userId)
          : false;
        console.log('friendData', friendData);
        console.log('user', user);
        return (
          <Card key={userId} padding="8px">
            <CardHeader>
              <Heading size="md">{nickname}</Heading>
            </CardHeader>
            <CardBody>
              <Avatar boxSize="100px" src={avatarUrl ?? './assets/sample_chat.png'} />
              <p>{isFriend ? 'Friend' : 'Not friend'}</p>
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
