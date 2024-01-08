import {useGetInvitationsQuery, useUpdateInvitationMutation} from '@/lib/redux/api';
import {InvitationAction_Url, InvitationKind_Url} from '@/shared/HttpEndpoints/types';
import Loading from './global/Loading';
import {Avatar, Button, Card, CardBody, CardHeader, HStack, Heading} from '@chakra-ui/react';
import {Invitation} from '@/shared/HttpEndpoints/interfaces/invitation.interface';
import {useAppSelector} from '@/lib/redux/hook';
import {setNotification, userIdSelector} from '@/lib/redux';
import {useDispatch} from 'react-redux';

function Invitation({kind}: {kind: InvitationKind_Url}) {
  const {data, isLoading} = useGetInvitationsQuery([kind]);
  const [updateInvitation] = useUpdateInvitationMutation();
  const dispatch = useDispatch();
  const userId = useAppSelector(userIdSelector);

  if (isLoading || !data) return <Loading />;

  const handleUpdateInvitation = async (invitationId: number, action: InvitationAction_Url) => {
    try {
      await updateInvitation([kind, action, invitationId]).unwrap();
      const actionMessage =
        action === 'cancel' ? 'canceled' : action === 'accept' ? 'accepted' : 'refused';
      dispatch(
        setNotification({
          status: 'info',
          title: `Invitation - ${action}`,
          description: `The invitation has been ${actionMessage}.`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'error',
          title: `Invitation - ${action}`,
          description: JSON.stringify(error),
        }),
      ); 
    }
  };
  return (
    <HStack spacing="8px">
      {data.invitations.map(invitation => {
        const {sender, receiver, invitationId} = invitation as Invitation & {
          kind: 'FRIEND';
        };
        const isSender = sender.userId === userId;
        return (
          <Card key={invitationId} padding="8px">
            <CardHeader>
              <Heading size="md">{isSender ? receiver.nickname : sender.nickname}</Heading>
            </CardHeader>
            <CardBody>
              <Avatar
                boxSize="100px"
                src={
                  (isSender ? receiver.avatarUrl : sender.avatarUrl) ?? './assets/sample_chat.png'
                }
              />
            </CardBody>
            <Button
              colorScheme={isSender ? 'orange' : 'green'}
              margin={'2px'}
              onClick={() => handleUpdateInvitation(invitationId, isSender ? 'cancel' : 'accept')}>
              {isSender ? 'キャンセル' : '承認'}
            </Button>
            {!isSender && (
              <Button
                colorScheme="red"
                margin={'2px'}
                onClick={() => handleUpdateInvitation(invitationId, 'decline')}>
                拒否
              </Button>
            )}
          </Card>
        );
      })}
    </HStack>
  );
}

export default Invitation;
