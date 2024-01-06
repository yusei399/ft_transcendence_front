'use client';
import Loading from '@/app/components/global/Loading';
import {userIdSelector} from '@/lib/redux';
import {useAllUsersQuery} from '@/lib/redux/api';
import {useGetFriendQuery} from '@/lib/redux/api/friendApi';
import {useAppSelector} from '@/lib/redux/hook';
import {Avatar, Card, CardBody, CardHeader, HStack, Heading, Text} from '@chakra-ui/react';

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
  if (!data) return <div>You even doesn't exist</div>;

  return (
    <HStack spacing="8px">
      {data.users.map(user => {
        const {userId, nickname, avatarUrl} = user;
        const isFriend = friendData
          ? friendData.friendsProfiles.some(p => p.userId === userId)
          : false;
        if (userId === current_userId) return <Text>No other user</Text>;
        return (
          <Card key={userId}>
            <CardHeader>
              <Heading size="md">{nickname}</Heading>
            </CardHeader>
            <CardBody>
              <Avatar boxSize="100px" src={avatarUrl ?? './assets/sample_chat.png'} />
              <p>{isFriend ? 'Friend' : 'Not friend'}</p>
            </CardBody>
          </Card>
        );
      })}
    </HStack>
  );
}

export default FriendList;
