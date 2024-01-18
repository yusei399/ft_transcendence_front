/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import Loading from '@/app/components/global/Loading';
import SendInvitationButton from '@/app/components/invitation/SendInvitationButton';
import {setNotification, userIdSelector} from '@/lib/redux';
import {useAllUsersQuery, useGetFriendQuery, useRemoveFriendMutation} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hook';
import {UserPublicProfile} from '@/shared/HttpEndpoints/interfaces';
import {RepeatIcon, StarIcon} from '@chakra-ui/icons';
import {Avatar, Button, Card, CardBody, CardHeader, Flex, HStack, Heading} from '@chakra-ui/react';
import SeeUserProfileButton from './SeeUserProfileButton';

type UsersListProps = {
  invitationButton?: 'friend' | 'chat';
  targetChatId?: number;
  targetGameId?: number;
  filter?: 'allUser' | 'friendsOnly' | 'withoutFriends';
  toExclude?: number[];
  onlineOnly?: boolean;
  removeFriendButton?: boolean;
};

function UsersList({
  toExclude = [],
  invitationButton,
  targetChatId,
  targetGameId,
  filter = 'allUser',
  onlineOnly = false,
  removeFriendButton = false,
}: UsersListProps)  {
  const {data: usersData, error: usersError} = useAllUsersQuery([], {
    skip: filter === 'friendsOnly',
  });
  const {data: friendsData, error: friendsError} = useGetFriendQuery([]);
  const [removeFriend] = useRemoveFriendMutation();

  const currentUserId = useAppSelector(userIdSelector) as number;
  const dispatch = useAppDispatch();

  if (usersError) console.log(usersError);
  if (friendsError) console.log(friendsError);
  if (filter !== 'friendsOnly' && usersData === undefined) return <Loading />;
  if (friendsData === undefined) return <Loading />;

  let usersList: (UserPublicProfile & {isFriend: boolean})[] = [];
  if (filter === 'friendsOnly') {
    friendsData?.friendsProfiles.forEach(friend => {
      if (onlineOnly && !friend.isOnline) return;
      usersList.push({...friend, isFriend: true});
    });
  } else if (filter === 'withoutFriends') {
    usersData?.users.forEach(user => {
      if (user.userId === currentUserId) return;
      if (onlineOnly && !user.isOnline) return;
      if (friendsData?.friendsProfiles.find(friend => friend.userId === user.userId)) return;
      usersList.push({...user, isFriend: false});
    });
  } else {
    usersData?.users.forEach(user => {
      if (user.userId === currentUserId) return;
      if (onlineOnly && !user.isOnline) return;
      const isFriend = friendsData?.friendsProfiles.find(friend => friend.userId === user.userId);
      usersList.push({...user, isFriend: isFriend ? true : false});
    });
  }
  usersList = usersList.filter(user => !toExclude.includes(user.userId));

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

  const userNotFoundMessage = 'no one here...';

  const title =
    filter === 'friendsOnly'
      ? 'フレンド一覧'
      : filter === 'withoutFriends'
        ? 'その他のユーザー一覧'
        : 'ユーザー一覧';

  return (
    <HStack spacing="8px" wrap="wrap" justifyContent="center" padding="12px" flexDir="column">
      <Heading size="lg">{title}</Heading>
      {usersList.length === 0 && <Heading size="md">{userNotFoundMessage}</Heading>}
      {usersList.map(user => {
        const {userId, nickname, avatarUrl, isOnline, isFriend} = user;
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
            {invitationButton && (
              <SendInvitationButton
                invitationKind={invitationButton}
                userId={userId}
                targetChatId={targetChatId}
                targetGameId={targetGameId}
              />
            )}
            {removeFriendButton && isFriend && (
              <Button colorScheme="red" onClick={() => handleRemoveFriend(userId, nickname)}>
                フレンド削除
              </Button>
            )}
            <SeeUserProfileButton userId={userId} />
          </Card>
        );
      })}
    </HStack>
  );
}

export default UsersList;
