'use client';

import {useGetInvitationFromToQuery, useGetInvitationsQuery} from '@/lib/redux/api';
import {InvitationKind_Url} from '@/shared/HttpEndpoints/types';
import {Avatar, Card, CardBody, CardHeader, Flex, HStack, Heading} from '@chakra-ui/react';
import {useAppSelector} from '@/lib/redux/hook';
import {userIdSelector} from '@/lib/redux';
import UpdateInvitationButton from './UpdateInvitationButton';
import {Invitation} from '@/shared/HttpEndpoints/interfaces/invitation.interface';

type InvitationsListProps = {kind_url: InvitationKind_Url} | {userId: number};

function InvitationsList(props: InvitationsListProps) {
  let invitations: Invitation[] = [];
  if ('kind_url' in props) {
    const {kind_url} = props;
    const {data} = useGetInvitationsQuery([kind_url]);
    invitations = data?.invitations ?? [];
  } else {
    const {userId} = props;
    const {data: _data, error} = useGetInvitationFromToQuery([userId]);
    invitations = _data?.invitations ?? [];
    if (error) console.log(error);
  }
  const userId = useAppSelector(userIdSelector) as number;

  return (
    <HStack spacing="8px" wrap="wrap" justifyContent="center" padding="12px" flexDir="column">
      <Heading size="lg">招待</Heading>
      {invitations.length === 0 && <Heading size="lg">招待はありません</Heading>}
      <Flex flexFlow="row">
        {invitations.map(invitation => {
          const {sender, receiver, invitationId, kind} = invitation;
          const isSender = sender.userId === userId;
          const kind_url = kind === 'CHAT' ? 'chat' : 'friend';
          return (
            <Card key={invitationId} padding="8px" rowGap="6px" width="160px">
              <CardHeader padding={0}>
                <Heading size="md" textAlign="center">
                  {isSender ? `${receiver.nickname}へ` : `${sender.nickname}から`}
                </Heading>
              </CardHeader>
              <CardBody padding="6px" margin="auto">
                <Avatar
                  boxSize="80px"
                  src={(isSender ? receiver.avatarUrl : sender.avatarUrl) ?? '/assets/sample.png'}
                />
                {kind === 'CHAT' && (
                  <Heading size="sm">{invitation.targetChatName}への招待</Heading>
                )}
              </CardBody>
              <UpdateInvitationButton
                invitationId={invitationId}
                invitationKind={kind_url}
                targetChatId={kind === 'CHAT' ? invitation.targetChatId : undefined}
                action={isSender ? 'cancel' : 'accept'}
              />
              {!isSender && (
                <UpdateInvitationButton
                  invitationId={invitationId}
                  invitationKind={kind_url}
                  action={'decline'}
                />
              )}
            </Card>
          );
        })}
      </Flex>
    </HStack>
  );
}

export default InvitationsList;
