import {setNotification} from '@/lib/redux';
import {useGetInvitationsQuery, useSendInvitationMutation} from '@/lib/redux/api';
import {HttpSendInvitation} from '@/shared/HttpEndpoints/invitation';
import {InvitationKind_Url} from '@/shared/HttpEndpoints/types';
import {Button} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';

type SendInvitationButtonProps = {
  userId: number;
  invitationKind: InvitationKind_Url;
  targetChatId?: number;
  targetGameId?: number;
};

function SendInvitationButton({
  userId,
  targetChatId,
  targetGameId,
  invitationKind,
}: SendInvitationButtonProps) {
  const dispatch = useDispatch();
  const {data} = useGetInvitationsQuery([invitationKind]);
  const [sendInvitation] = useSendInvitationMutation();

  if (data === undefined) return null;

  const kindWithCapital = invitationKind.charAt(0).toUpperCase() + invitationKind.slice(1);

  const handleSendInvitation = async (targetUserId: number) => {
    try {
      let req: HttpSendInvitation.reqTemplate;
      if (invitationKind === 'friend') req = {targetUserId};
      else if (invitationKind === 'chat') req = {targetUserId, targetChatId};
      else req = {targetUserId, targetGameId};
      await sendInvitation([invitationKind, req]).unwrap();
      dispatch(
        setNotification({
          status: 'info',
          title: `${kindWithCapital} invitation sent!`,
          description: `${kindWithCapital} invitation sent successfully`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'error',
          title: 'Error',
          description: `Error at sending ${invitationKind} invitation`,
        }),
      );
      console.log(error);
    }
  };

  const text =
    invitationKind === 'friend'
      ? 'フレンド申請'
      : invitationKind === 'chat'
        ? 'チャット招待送信'
        : 'ゲーム招待送信';

  const alreadySent =
    data.invitations.find(invitation => {
      if (invitation.receiver.userId !== userId) return false;
      if (invitationKind === 'friend') return true;
      if (invitationKind === 'chat' && 'targetChatId' in invitation)
        return invitation.targetChatId === targetChatId;
      return false;
    }) !== undefined;
  const alreadyReceived =
    data.invitations.find(invitation => {
      if (invitation.sender.userId !== userId) return false;
      if (invitationKind === 'friend') return true;
      if (invitationKind === 'chat' && 'targetChatId' in invitation)
        return invitation.targetChatId === targetChatId;
      return false;
    }) !== undefined;
  return (
    <Button
      colorScheme="green"
      onClick={() => handleSendInvitation(userId)}
      isDisabled={alreadySent || alreadyReceived}>
      {text}
    </Button>
  );
}

export default SendInvitationButton;
