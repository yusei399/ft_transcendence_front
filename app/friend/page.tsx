'use client';
import {useUpdateInvitationMutation} from '@/lib/redux/api';
import FriendList from './components/FriendList';
import {Button} from '@chakra-ui/react';

export default function IndexPage() {
  const invitationId = 0; //適当
  const [updateInvitation, {isLoading, error}] = useUpdateInvitationMutation();

  const handleAccept = async () => {
    try {
      await updateInvitation(['friend', 'accept', invitationId]).unwrap();
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };
  return (
    <>
      <FriendList />
      {/* 招待の実装なので、削除か移してください */}
      <Button type="button" onClick={() => handleAccept}>
        accept invitations
      </Button>
    </>
  );
}
