'use client';
import {useJoinWaitListMutation, useLeaveGameMutation} from '@/lib/redux/api';
import {Button} from '@chakra-ui/react';

type JoinLeaveWaitListProps = {
  hasJoined: boolean;
};

function JoinLeaveWaitList({hasJoined}: JoinLeaveWaitListProps) {
  const [joinGame] = useJoinWaitListMutation();
  const [leaveGame] = useLeaveGameMutation();

  async function joinleaveWaitList() {
    try {
      hasJoined ? await leaveGame([]).unwrap() : await joinGame([]).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Button size="lg" colorScheme={hasJoined ? 'red' : 'green'} onClick={joinleaveWaitList}>
      {hasJoined ? 'Leave' : 'Join Wait List'}
    </Button>
  );
}

export default JoinLeaveWaitList;
