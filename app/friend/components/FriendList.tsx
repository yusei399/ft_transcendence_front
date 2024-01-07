'use client';
import Loading from '@/app/components/global/Loading';
import {userIdSelector} from '@/lib/redux';
import {useAllUsersQuery, useGetFriendQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hook';
import {Avatar, Button, Card, CardBody, CardHeader, HStack, Heading} from '@chakra-ui/react';

function FriendList() {
  const {data, isLoading, error, isFetching} = useAllUsersQuery([]);
  const {
    data: friendData,
    isLoading: friendIsLoading,
    error: friendError,
    isFetching: FriendIsFetching,
  } = useGetFriendQuery([]);

  const current_userId = useAppSelector(userIdSelector);

  if (isLoading || isFetching || friendIsLoading || FriendIsFetching) return <Loading />;
  if (error) console.log(error);
  if (friendError) console.log(friendError);
  if (!data) return <div>You doesn't even exist</div>;

  const users = data.users.filter(user => user.userId !== current_userId);

  return (
    <HStack spacing="8px">
      {users.map(user => {
        const {userId, nickname, avatarUrl} = user;
        const isFriend = friendData
          ? friendData.friendsProfiles.some(p => p.userId === userId)
          : false;
        return (
          <Card key={userId}>
            <CardHeader>
              <Heading size="md">{nickname}</Heading>
            </CardHeader>
            <CardBody>
              <Avatar boxSize="100px" src={avatarUrl ?? './assets/sample_chat.png'} />
              <p>{isFriend ? 'Friend' : 'Not friend'}</p>
            </CardBody>
            <Button colorScheme="green">フレンド申請</Button>
          </Card>
        );
      })}
    </HStack>
  );
}

export default FriendList;
