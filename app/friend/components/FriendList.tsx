'use client';
import Loading from '@/app/components/global/Loading';
import {userIdSelector} from '@/lib/redux';
import {useAllUsersQuery, useSendInvitationMutation} from '@/lib/redux/api';
import {useGetFriendQuery} from '@/lib/redux/api/friendApi';
import {useAppSelector} from '@/lib/redux/hook';
import { HttpSendInvitation } from '@/shared/HttpEndpoints/invitation';
import {Avatar, Button, Card, CardBody, CardHeader, HStack, Heading, Text} from '@chakra-ui/react';
import { useState } from 'react';



function FriendList() {
  const {data, isLoading, error, isFetching} = useAllUsersQuery([]);
  const [sendInvitation, {data: otherUserdata , isError: invitationerror, isSuccess}] = useSendInvitationMutation();
  const [reqData, setReqData] = useState<HttpSendInvitation.reqTemplate>({
    targetUserId: undefined,
  });
  const {
    data: friendData,
    isLoading: friendIsLoading,
    error: friendError,
    isFetching: FriendIsFetching,
  } = useGetFriendQuery([]);


  const current_userId = useAppSelector(userIdSelector);
  const handleInvitation = async (userId: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendInvitation(['friend', { targetUserId: userId }]).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading || isFetching || friendIsLoading || FriendIsFetching) return <Loading />;
  if (error) console.log(error);
  if (!data) return <p>You even doesn't exist</p>;

  return (
    <HStack spacing="8px">
      {data.users.map(user => {
        const {userId, nickname, avatarUrl} = user;
        const isFriend = friendData
          ? friendData.friendsProfiles.some(p => p.userId === userId)
          : false;
        if (userId === current_userId) return ;
        return (
          <Card key={userId}>
            <CardHeader>
              <Heading size="md">{nickname}</Heading>
            </CardHeader>
            <CardBody>
              <Avatar boxSize="100px" src={avatarUrl ?? './assets/sample_chat.png'} />
              <p>{isFriend ? 'Friend' : 'Not friend'}</p>
            </CardBody>
              <Button colorScheme="green" onClick={(e) => handleInvitation(userId, e)}>フレンド申請</Button>
          </Card>
        );
      })}
    </HStack>
  );
}

export default FriendList;
