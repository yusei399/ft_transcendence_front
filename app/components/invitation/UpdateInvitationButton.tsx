/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {setNotification} from '@/lib/redux';
import {useUpdateInvitationMutation} from '@/lib/redux/api';
import {InvitationAction_Url, InvitationKind_Url} from '@/shared/HttpEndpoints/types';
import {Button} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';

type UpdateInvitationButtonProps = {
  invitationId: number;
  invitationKind: InvitationKind_Url;
  targetChatId?: number;
  targetGameId?: number;
  action: InvitationAction_Url;
};

function UpdateInvitationButton({
  targetChatId,
  targetGameId,
  invitationKind,
  invitationId,
  action,
}: UpdateInvitationButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [updateInvitation] = useUpdateInvitationMutation();

  const actionMessage =
    action === 'cancel' ? 'canceled' : action === 'accept' ? 'accepted' : 'refused';
  const status = action === 'cancel' ? 'warning' : action === 'accept' ? 'success' : 'error';
  const kindWithCapital = invitationKind.charAt(0).toUpperCase() + invitationKind.slice(1);

  const handleUpdateInvitation = async (invitationId: number, action: InvitationAction_Url) => {
    try {
      await updateInvitation([invitationKind, action, invitationId]).unwrap();
      if (action === 'accept' && invitationKind === 'chat' && targetChatId) {
        router.push(`/chat/${targetChatId}`);
      }
      dispatch(
        setNotification({
          status,
          title: `${kindWithCapital} invitation - ${action}`,
          description: `${kindWithCapital} invitation has been ${actionMessage}.`,
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
  const color = action === 'cancel' ? 'orange' : action === 'accept' ? 'green' : 'red';
  const text = action === 'cancel' ? 'キャンセル' : action === 'accept' ? '承認' : '拒否';

  return (
    <Button
      colorScheme={color}
      margin={'2px'}
      onClick={() => handleUpdateInvitation(invitationId, action)}>
      {text}
    </Button>
  );
}

export default UpdateInvitationButton;
